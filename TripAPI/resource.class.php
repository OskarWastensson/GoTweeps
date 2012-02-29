<?php
 
abstract class Resource{
 
	protected $params;
	public $data;
 
	abstract function set_params();
 
	function __construct($method, $id, $data = null, $parent = null, $pid = null){
		$this->set_params();
		 
		if(strtolower($id) == 'me') {
			$id = $_SESSION['access_token']['user_id']; // insert logged in user
		};
		
		if(strtolower($pid) == 'me') {
			$pid = $_SESSION['access_token']['user_id']; // insert logged in user
		};

		$id = intval($id);
		$pid = intval($pid);

		switch($method) {
			case 'GET':
					$this->get($id, $parent, $pid);
				break;
			case 'POST':
					$id = $this->post($data);
					if($parent) {
						$this->attach($id, $parent, $pid);
					} else {
						$this->get($id);
					} 
				break;
			case 'PUT':
					if($data) {
						$this->put($id, $data);
					}
					if($parent) {
						$this->attach($id, $parent, $pid);
					} else {
						$this->get($id);
					}
				break;
			case 'DELETE':
					if($parent) {
						$this->detach($id, $parent);
						$this->get($id);
					} else {
						$this->delete($id);
					}
				break;
			default:
					$this->data = error(REQUEST_ERROR);
		}
	}

	function get($id, $parent = null, $pid = null){
		
		// Create Where clause
		$where_sql = "";
		if($id) {
			$where_sql = "WHERE id = " . mysql_real_escape_string($id);      
		} elseif ($parent) {
			$parent = strtolower($parent);
			if(strstr($this->params['view_fields'], $parent)) {
				$where_sql = "WHERE $parent = " . mysql_real_escape_string($pid);     
			} else {
				error(REQUEST_ERROR);
			}
		}

		$query = "
			SELECT {$this->params['view_fields']}
			FROM {$this->params['view']}
			$where_sql
		";

		if($result = mysql_query($query)) {
				$resource = array();
				while($row = mysql_fetch_assoc($result)){
					$resource[] = $row;
				}

				if(count($resource)) {
					$this->data = $resource;
				} else {
					// $this->data = error(EMPTY_SET);
				}
		} else {
			$this->data = error(DB_ERROR, array('message' => mysql_error(), 'sql' => $query));  
		}

		if($id && isset($this->params['child_resources'])) {
			$child_resources = explode(',', $this->params['child_resources']);
			foreach($child_resources as $resource) {
				require_once($resource . '.resource.php');    
				$obj = new $resource('GET', '', null, get_class($this), $id);
				$this->data[0][$resource] = $obj->data;
			}
		} elseif(isset($this->params['child_resources'])) {
			$child_resources = explode(',', $this->params['child_resources']);
			
			if(is_array($this->data) and count($this->data)) {
				foreach($this->data as $key => $row) {
					$id = $row['id']; 
					foreach($child_resources as $resource) {
						require_once($resource . '.resource.php');    
						$obj = new $resource('GET', '', null, get_class($this), $id);
						$this->data[$key][$resource] = $obj->data;
					}
				}
			}
		}
	}
 
	function post($data) {
		$fields = explode(', ',$this->params['post_fields']);
		
		$update_fields = array();
 		
 		foreach($fields as $field){
			if (isset($data[$field])){
				$value = $data[$field];
				$update_fields[] = "$field='$value'";
			}
		}
 
		$fields_sql = implode(',',$update_fields);
		if($fields_sql){
			$query = "
				INSERT INTO {$this->params['table']}
				SET $fields_sql
			";
			$result = mysql_query($query);
		}

		$id = mysql_insert_id();
		if(isset($this->params['child_resources'])) {
			$child_resources = explode(',', $this->params['child_resources']);
		
			foreach($child_resources as $key => $resource) {
				if(isset($data[$resource])) {
					foreach($data[$resource] as $i => $subset) {
						require_once($resource . '.resource.php');    
						$obj = new $resource('POST', '', $subset, get_class($this), $id);
					}
				}
			}
		}
		return $id;
	}
 
	function put($id,$data){
		$id = mysql_real_escape_string($id);
 
		$fields = explode(', ',$this->params['put_fields']);
 
		$update_fields = array();
 
		foreach($fields as $field){
			if(isset($data[$field])){
				$value = $data[$field];
				$update_fields[] = "$field='$value'";
			}
		}
 
		$fields_sql = implode(',',$update_fields);
		if($fields_sql){
			$query = "
				UPDATE {$this->params['table']}
				SET $fields_sql
				WHERE id='$id'
			";
			$result = mysql_query($query);
		}

		$child_resources = explode(',', $this->params['child_resources']);
		foreach($child_resources as $resource) {
			if(isset($data[$resource])) {
				require_once($resource . '.resource.php');    
				$obj = new $resource('POST', '', $data[$resource], get_class($this), $id);
			}
		}
		
	}
 
	function delete($id){
		$query = "
			DELETE FROM {$this->params['table']}
			WHERE id='$id'
		";
		mysql_query($query);
		return array('id' => $id, 'action' => 'delete');
	}

	function detach($id, $parent) {
		$query = "
			UPDATE {$this->params['table']}
			SET $parent = 0
			WHERE id = " . mysql_escape_string($id);
		mysql_query($query);
	}

	function attach($id, $parent, $pid) {
		$query = "
			UPDATE {$this->params['table']}
			SET $parent = $pid
			WHERE id = " . mysql_escape_string($id);
		mysql_query($query);
	}

}
 
?>