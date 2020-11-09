<?php

function getAllBoats()
{
    global $db;

    $query = "SELECT * FROM boats";
    $statement = $db->prepare($query);
    $statement->execute();

    $results = $statement->fetchAll();
    $statement->closeCursor();
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
    return $results;
}


?>

