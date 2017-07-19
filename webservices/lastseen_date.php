<?php
	// Le tableau de résultat
	$result_request = array();
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	
	$query = "SELECT Date as c, count(Date) from lastseen where lastseen.Date BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() group by lastseen.Date order by c DESC limit 0, 30";
	$result = mysqli_query($conn, $query);
	$cpt = 0;
	while ($row = mysqli_fetch_array($result)) {
		$r[$cpt]['date']  = $row[0];
		$r[$cpt]['count'] = $row[1];
		$cpt++;
	}

	mysqli_free_result($result);
	
	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");

	// Renvoyer le résultat au javascript
	echo json_encode($r);

?>