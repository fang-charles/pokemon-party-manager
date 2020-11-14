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
	case "verifyPassword":
        $username = $dataPacket['username'];
        //$password = $dataPacket['password'];
		echo json_encode(verifyPassword($username));
        break;
    case "createAccount":
        $username = $dataPacket['username'];
        $password = $dataPacket['password'];
        echo json_encode(createAccount($username, $password));
        break;
	default:
		echo "Your fname does not match";
}
