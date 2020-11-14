<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

require_once __DIR__ . '/connectdb.php';
require_once __DIR__ . '/dbquery.php';


// Maybe this line is causing the extra slashes?
// Ask charles about it
$data = json_decode(file_get_contents("php://input"), TRUE);

$dataPacket = $data['dataPacket'];
$fname = $data['fname'];

//Specify the fname in api.tsx
switch ($fname) {
	case "getBasePokemon":
		$pokedexNumber = $dataPacket['pokedexNumber'];
		echo json_encode(getBasePokemon($pokedexNumber));
		break;
	case "deletePokemon":
		$pokeID = $dataPacket['id77'];
		echo json_encode(deletePokemon($pokeID));
		break;
	case "getSpecificPokemon":
		$pkid = $dataPacket['pokemonid'];
		echo json_encode(getSpecificPokemon($pkid));
		break;
	case "addPokemon":
		$pkid = $dataPacket['pokedex_number'];
		$lev = $dataPacket['level'];
		$nickname = $dataPacket['nickname'];
		$party_id = $dataPacket['party_id'];
		echo json_encode(addPokemon($pkid, $lev, $nickname, $party_id));
		break;
	default:
		echo "Your fname does not match";
}
