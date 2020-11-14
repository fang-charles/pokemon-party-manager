<?php

/******************************/
// connecting to GCP cloud SQL instance

// $username = 'root';
// $password = 'your-root-password';

// $dbname = 'your-database-name';

// if PHP is on GCP standard App Engine, use instance name to connect
// $host = 'instance-connection-name';

// if PHP is hosted somewhere else (non-GCP), use public IP address to connect
// $host = "public-IP-address-to-cloud-instance";


/******************************/
// connecting to DB on XAMPP (local)

$username = 'cs4750user';
$password = 'password';
$host = 'localhost:3306';
$dbname = 'ebl9rd_c';


require_once __DIR__ . '/dbquery.php';


$dsn = "mysql:host=$host;dbname=$dbname";
$db = "";
$opt = [
   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
   PDO::ATTR_EMULATE_PREPARES   => false,
];

/** connect to the database **/
try {
   $db = new PDO($dsn, $username, $password, $opt);
   // echo "<p>You are connected to the database</p>";
   //echo json_encode(getItem("air-mail"));
   // echo json_encode(forgetMove(5, "flamethrower"));
   //echo json_encode(learnMove(5, "flamethrower", "tackle", "absorb", "acid"));
   //echo json_encode(learnMove(5, "megahorn", "sky-attack", "flamethrower", "tackle"));
   // echo json_encode(gainItem(6, 'apicot-berry'));
   // echo json_encode(addParty(1));
   //echo "<p>You are connected to the database</p>";
   //echo json_encode(getBasePokemon(1));
   //echo json_encode(addPokemon(1, 90, "Hey", 1));
} catch (PDOException $e)     // handle a PDO exception (errors thrown by the PDO library)
{
   // Call a method from any object, 
   // use the object's name followed by -> and then method's name
   // All exception objects provide a getMessage() method that returns the error message 
   $error_message = $e->getMessage();
   echo "<p>An error occurred while connecting to the database: $error_message </p>";
} catch (Exception $e)       // handle any type of exception
{
   $error_message = $e->getMessage();
   echo "<p>Error message: $error_message </p>";
}
