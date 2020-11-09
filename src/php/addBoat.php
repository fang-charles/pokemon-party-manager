<?php
 header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

 require_once __DIR__ . '/connectdb.php';
 require_once __DIR__ . '/dbquery.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	
	$data = json_decode(file_get_contents("php://input"), TRUE);
	
  $bid = $data['bid'];
  $bname = $data['bname'];
  $color = $data['color'];


	echo $bid;
	echo $bname;
	echo $color;

	addBoat($bid,$bname,$color);
	echo "Complete";
  
}
else{
	echo "NOT POST";
}
?>