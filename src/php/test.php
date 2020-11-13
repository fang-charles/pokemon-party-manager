<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

require_once __DIR__ . '/connectdb.php';
require_once __DIR__ . '/dbquery.php';


//echo json_encode(getBasePokemon(1));
echo json_encode(addPokemon(1, 90, "Hey", 1));
