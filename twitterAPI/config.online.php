<?php

define('OAUTH_TOKEN', '491288200-xKEcialrDMZKD2iAd2mjnNKhCpkIo2GnoVOvJ3DY');
define('OAUTH_SECRET', 'cAfcR90ncg4ENFPTqc9LFqJXxgquiFl7PvWv7nBg');
define('CONSUMER_KEY', '5Pu9zSOeZ2KxyRsmbTzw');
define('CONSUMER_SECRET', 'yHA8w5Blj1DurPvPgdOygBH7pG8GTJUJwQhhpcRuCG0');
define('OAUTH_CALLBACK', 'http://localhost/gotweeps/callback.php');

mysql_connect('gotweeps.se.mysql', 'gotweeps_se', 'sA2B8wz2') or die(mysql_error());
mysql_select_db('gotweeps_se') or die(mysql_error());
mysql_query('SET NAMES utf8');

require_once('twitteroauth.php');

?>
