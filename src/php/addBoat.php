<?php
 header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

 require_once __DIR__ . '\connectdb.php';
 require_once __DIR__ . '\dbquery.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	
	$data = json_decode(file_get_contents("php://input"), TRUE);

	$dataPacket = $data['dataPacket'];
	$fname = $data['fname'];

	//Specify the fname in api.tsx
	switch ($fname) {
	   case "addBoat":
		$bid = $dataPacket['bid'];
		$bname = $dataPacket['bname'];
		$color = $dataPacket['color'];
		addBoat($bid,$bname,$color);
		 break;
	   default:
		 echo "Your fname does not match";
	 }


  
}
else{
	echo "---NOT POST---";
}
?>