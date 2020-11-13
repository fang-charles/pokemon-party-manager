<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

require_once __DIR__ . '/connectdb.php';
require_once __DIR__ . '/dbquery.php';



$data = json_decode(file_get_contents("php://input"), TRUE);

$dataPacket = $data['dataPacket'];
$fname = $data['fname'];

//Specify the fname in api.tsx
switch ($fname) {
	case "getMove":
		$moveName = $dataPacket['name77'];
		echo json_encode(getMove($moveName));
		break;
	case "learnMove":
		$pk_id = $dataPacket['pk_id'];
		$move1 = $dataPacket['move1'];
		$move2 = $dataPacket['move2'];
		$move3 = $dataPacket['move3'];
		$move4 = $dataPacket['move4'];
        echo json_encode(learnMove($pk_id, $move1, $move2, $move3, $move4));
        break;
	case "forgetMove":
		$pk_id = $dataPacket['pk_id'];
		$itemName = $dataPacket['name77'];
        echo json_encode(forgetMove($pk_id, $itemName));
        break;
	default:
		echo "Your fname does not match";
}
