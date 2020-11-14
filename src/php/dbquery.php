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

	$query = "SELECT * FROM boats WHERE bid=101";
	$statement = $db->prepare($query);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function addBoat($bid, $bname, $color)
{
	global $db;

	$query = "INSERT INTO boats VALUES(:bid, :bname, :color)";
	$statement = $db->prepare($query);
	$statement->bindValue(':bid', $bid);
	$statement->bindValue(':bname', $bname);
	$statement->bindValue(':color', $color);
	$statement->execute();        // run query, if the statement is successfully executed, execute() returns true
	// false otherwise

	$statement->closeCursor();    // release hold on this connection
}

function forgetMove($pokemonID, $moveName)
// Ratchetly tested through connectdb, it works
{
	global $db;
	$query = "DELETE FROM learned WHERE pk_id = :pokemon_ID AND move_name = :move_Name";
	$statement = $db->prepare($query);
	$statement->bindValue(':pokemon_ID', $pokemonID);
	$statement->bindValue(':move_Name', $moveName);
	$statement->execute();
	$statement->closeCursor();
}

function learnMove($pokemonID, $moveA, $moveB, $moveC, $moveD)
// Ratchetly tested through connectdb, it works
// Requires all 4 parameters to be filled in though, don't know if we want to
// have option to learn a NULL move or single move
{
	global $db;
	$query = "CALL setMoves(:pk_id, :move1, :move2, :move3, :move4)";
	$statement = $db->prepare($query);
	$statement->bindValue(':pk_id', $pokemonID);
	$statement->bindValue(':move1', $moveA);
	$statement->bindValue(':move2', $moveB);
	$statement->bindValue(':move3', $moveC);
	$statement->bindValue(':move4', $moveD);

	$statement->execute();
	$statement->closeCursor();
}

function gainItem($pokemonID, $itemName)
// Ratchetly tested through connectdb, it works
{
	global $db;

	$query = "CALL setItem(:pk_id, :item_name)";
	$statement = $db->prepare($query);
	$statement->bindValue(':pk_id', $pokemonID);
	$statement->bindValue(':item_name', $itemName);

	$statement->execute();
	$statement->closeCursor();
}

function addParty($userID)
// Ratchetly tested through connectdb, it works
{
	global $db;

	$query = "CALL generateParty(:userID, @party_id);";
	$statement = $db->prepare($query);
	$statement->bindValue(':userID', $userID);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	// results is partyID
	return $results;
}

function getBasePokemon($pokedexNumber)
{
	global $db;

	$query = "SELECT * FROM base_pokemon WHERE pokedex_number=:pokedex";
	$statement = $db->prepare($query);
	$statement->bindValue(':pokedex', $pokedexNumber);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getItem($itemName)
{
	global $db;

	$query = "SELECT * FROM item WHERE item_name=:itemName";
	$statement = $db->prepare($query);
	$statement->bindValue(':itemName', $itemName);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getAllItems()
{
	global $db;
	$query = "SELECT * FROM item";
	$statement = $db->prepare($query);
	$statement->execute();

	// fetchAll() returns an array for all of the rows in the result set
	$results = $statement->fetchAll();

	// closes the cursor and frees the connection to the server so other SQL statements may be issued
	$statement->closecursor();

	return $results;
}

function loseItem($pk_id, $itemName)
{
	global $db;

	$q1 = "SELECT * FROM item WHERE item_name = :itemName;";
	$statement1 = $db->prepare($q1);
	$statement1->bindValue(':itemName', $itemName);
	$statement1->execute();
	$ret = $statement1->fetch();
	$statement1->closeCursor();
	$query = "CALL loseItem(:pk_id, :itemName);";
	$statement = $db->prepare($query);
	$statement->bindValue(':itemName', $itemName);
	$statement->bindValue(':pk_id', $pk_id);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $ret;
}

function deleteParty($partyID)
{
	global $db;

	$q1 = "SELECT * FROM party WHERE party_id = :partyID;";
	$statement1 = $db->prepare($q1);
	$statement1->bindValue(':partyID', $partyID);
	$statement1->execute();
	$ret = $statement1->fetch();
	$statement1->closeCursor();
	$query = "CALL clearParty(:partyID);";
	$statement = $db->prepare($query);
	$statement->bindValue(':partyID', $partyID);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $ret;
}

function getParty($partyID)
{
	global $db;

	$query = "SELECT * FROM party WHERE party_id = :partyID;";
	$statement = $db->prepare($query);
	$statement->bindValue(':partyID', $partyID);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getSpecificPokemon($pkid)
{
	global $db;

	$query = "SELECT * FROM specific_pokemon WHERE pk_id=:pkid";
	$statement = $db->prepare($query);
	$statement->bindValue(':pkid', $pkid);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getUser($userID)
{
	global $db;

	$query = "CALL getUser(:userID)";
	$statement = $db->prepare($query);
	$statement->bindValue(':userID', $userID);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getUserID($username)
{
	global $db;

	$query = "SELECT * FROM user WHERE username = :username;";
	$statement = $db->prepare($query);
	$statement->bindValue(':username', $username);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getMove($moveName)
{
	global $db;

	$query = "SELECT * FROM move WHERE move_name = :moveName";
	$statement = $db->prepare($query);
	$statement->bindValue(':moveName', $moveName);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function getAllMoves()
{
	global $db;
	$query = "SELECT * FROM move";
	$statement = $db->prepare($query);
	$statement->execute();

	// fetchAll() returns an array for all of the rows in the result set
	$results = $statement->fetchAll();

	// closes the cursor and frees the connection to the server so other SQL statements may be issued
	$statement->closecursor();

	return $results;
}

#$holding, $moves, $baseInfo
#other info to add includes the party id
#level is a key word
function addPokemon($pokedex_number, $lev, $nickname, $party_id)
{
	global $db;

	$query = "CALL addPokemon(:pokedex_number, :level, :nickname, :party_id, @pk_id)";

	$statement = $db->prepare($query);
	$statement->bindValue(':pokedex_number', $pokedex_number);
	$statement->bindValue(':level', $lev);
	$statement->bindValue(':nickname', $nickname);
	$statement->bindValue(':party_id', $party_id);

	$statement->execute();        // run query, if the statement is successfully executed, execute() returns true
	$results = $statement->fetch();

	$statement->closeCursor();

	return $results;
}
/**
 * $query = "CALL countBoats(@p0)";
         	echo ": prepare ";
         	$statement = $db->prepare($query);
         	echo ": execute"; 
         	$statement->execute();
         	$counter = $statement->setFetchMode(PDO::FETCH_ASSOC);

 */

function deletePokemon($pokeID)
{
	global $db;

	$q1 = "SELECT * FROM specific_pokemon WHERE pk_id = :pokeID;";
	$statement1 = $db->prepare($q1);
	$statement1->bindValue(':pokeID', $pokeID);
	$statement1->execute();
	$ret = $statement1->fetch();
	$statement1->closeCursor();
	$query = "CALL removePokemon(:pokeID);";
	$statement = $db->prepare($query);
	$statement->bindValue(':pokeID', $pokeID);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $ret;
}

//login related queries
function verifyPassword($username, $password)
{
	global $db;
	$query = "SELECT * FROM user WHERE username = :username AND password = PASSWORD(:password)";
	$statement = $db->prepare($query);
	$statement->bindValue(':username', $username);
	$statement->bindValue(':password', $password);
	$statement->execute();

	$results = $statement->fetch();
	$statement->closeCursor();

	return $results;
}

function createAccount($username, $password)
{
	global $db;
	$query = "INSERT INTO user (username, password) VALUES (:username, PASSWORD(:password));";
	$statement = $db->prepare($query);
	$statement->bindValue(':username', $username);
	$statement->bindValue(':password', $password);
	try{
		$statement->execute();
	} catch(Exception $exception){
		return false;
	}

	$results = $statement->fetch();
	$statement->closeCursor();

	$q1 = "SELECT * FROM user WHERE username = :username;";
	$statement1 = $db->prepare($q1);
	$statement1->bindValue(':username', $username);
	$statement1->execute();
	$ret = $statement1->fetch();
	$statement1->closeCursor();

	return $ret;
}
