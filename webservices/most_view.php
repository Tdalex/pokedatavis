<?php
	// Le tableau de résultat
	$result_request = array();
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	
	$query = "SELECT pokemon.name, count(lastseen.Pokemon_Id_Pokemon) as c from lastseen, pokemon where pokemon.id = lastseen.Pokemon_Id_Pokemon GROUP BY lastseen.Pokemon_Id_Pokemon order by c DESC limit 0, 15";
	$result = mysqli_query($conn, $query);
	$cpt = 0;
	while ($row = mysqli_fetch_array($result)) {
		$r[$cpt]['types'] = $row[0];
		$r[$cpt]['value'] = $row[1];
		$cpt++;
	}

	mysqli_free_result($result);
	
	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");

	// Renvoyer le résultat au javascript
	echo json_encode($r);

?>