<?php

require_once __DIR__ . '\connectdb.php';
require_once __DIR__ . '\dbquery.php';

   $boats = getAllBoats();

   foreach($boats as $boat){
      echo $boat['bid']. "<br>";
      }


?>