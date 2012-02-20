<?php

// API class
class TripAPI {
	
	public $file;
	public $data;

	function __construct() {
		
		/* URI and Method handler */
		$keys = array_keys($_GET);
		$URI  = $keys[0];
		
		$URI_parts = explode('/',$URI);
		 
		// Strip empty parts
		$parts = array();
		foreach($URI_parts as $part){
		  if($part !== ''){
		    $parts[] = $part;
		  }
		}
		
		// Simple or nested request?
		if(count($parts) > 2) {
			// Nested
			$resource = $parts[2];
			$parent = $parts[0];
			$pid = $parts[1];
			$id = '';
			if(isset($parts[3])){
		  		$id = $parts[3];
			}
		} elseif(count($parts) != 0) {
			// Simple
			$parent = null;
			$pid = null;
			$resource = $parts[0];
			$id = '';
			if(isset($parts[1])){
		  	$id   = $parts[1];
			}
		} else {
			// No URI!
			$this->data = error(REQUEST_ERROR);
			return;			
		}
		 
		$method = $_SERVER['REQUEST_METHOD'];
		 
		switch ($method){
		        case 'GET':
		            $data = $_GET;
		            break;
		        case 'POST':
		        	$data = $_POST;
		            break;
		        case 'PUT':
		            parse_str(file_get_contents('php://input'), $put_vars);
		            $data = $put_vars;
		            break;
		        default: $data = array();
		}

		require_once('resource.class.php');
		require_once($resource . '.resource.php');		

		$obj = new $resource($method, $id, $data, $parent, $pid);
		$this->data = $obj->data;
	}
} 
?>