<?php
	// Le tableau de résultat
	$result_request = array();
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT typeA, typeB
			FROM pokemon";
	
	$result = mysqli_query($conn, $query);
	
	$types["un type"]    = 0;
	$types["deux types"] = 0;
	$all= 0;
	while ($row = mysqli_fetch_array($result)) {
		$all++;
		if(!empty($row[1])){
			$types["deux types"]++;
		}else{
			$types["un type"]++;			
		}
	}

	mysqli_free_result($result);
	
	foreach($types as $key => $value){
		$result_request[] = array($key, intval($value/$all*100));
	}

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");

	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>