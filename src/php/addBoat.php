<?php
 header("Access-Control-Allow-Origin: *");


 require_once __DIR__ . '\connectdb.php';
 require_once __DIR__ . '\dbquery.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $bid = $_POST['bid'];
  $bname = $_POST['bname'];
  $color = $_POST['color'];

  if (empty($bid) || empty($bname) || empty($color)) {
    echo "Something is empty";
  } else {
	addBoat($bid,$bname,$color);
	echo "Complete";
  }
}
else{
	echo "NOT POST";
}
?>