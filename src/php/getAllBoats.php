<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

require_once __DIR__ . '\connectdb.php';
require_once __DIR__ . '\dbquery.php';

   
   $data = json_decode(file_get_contents("php://input"), TRUE);
	
   $fname = $data['fname'];

   //Specify the fname in api.tsx
   switch ($fname) {
      case "getAllBoats":
         echo json_encode(getAllBoats());
        break;
      case "getABoat":
         echo json_encode(getThisBoat());
        break;
      default:
        echo "Your favorite color is neither red, blue, nor green!";
    }



?>