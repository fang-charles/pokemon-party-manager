<?php
 header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '\connectdb.php';
require_once __DIR__ . '\dbquery.php';

   $boats = getAllBoats();

   echo json_encode($boats);


?>