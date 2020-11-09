<?php

function getAllBoats()
{
	global $db;
	$query = "SELECT * FROM boats";
	$statement = $db->prepare($query);
	$statement->execute();
	
	// fetchAll() returns an array for all of the rows in the result set
	$results = $statement->fetchAll();
	
	// closes the cursor and frees the connection to the server so other SQL statements may be issued
	$statement->closecursor();
	
	return $results;
}

function getThisBoat()
{
    global $db;

    $query = "SELECT bid FROM boats WHERE bid=101";
    $statement = $db->prepare($query);
    $statement->execute();

    $results = $statement->fetch();
    $statement->closeCursor();

    var_dump($results);
    return $results;
}


?>

