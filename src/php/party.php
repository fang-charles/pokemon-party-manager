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
	case "getImagesURLS":
		$partyID = $dataPacket['id77'];
		echo json_encode(getImagesURLS($partyID));
		break;
	case "getPartyGivenUsername":
		$partyID = $dataPacket['id77'];
		echo json_encode(getPartyGivenUsername($partyID));
		break;
	case "getParty":
		$partyID = $dataPacket['id77'];
		echo json_encode(getParty($partyID));
		break;
	case "deleteParty":
		$partyID = $dataPacket['id77'];
		echo json_encode(deleteParty($partyID));
		break;
	case "addParty":
		$userID = $dataPacket['id77'];
		echo json_encode(addParty($partyID));
		break;
	case "getPartyGivenUsername":
		$partyID = $dataPacket['id77'];
		echo json_encode(getPartyGivenUsername($partyID));
		break;
	default:
		echo "Your fname does not match";
}
