<?php
	// Le tableau de résultat
	$result_request = array();
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	
	$query = "SELECT typeA, typeB
			FROM pokemon";
	
	$result = mysqli_query($conn, $query);

	$all = 0;
	$cpt = 0;
	$choice = $_GET['type'];

	while ($row = mysqli_fetch_array($result)) {
		$type  = $row[0];
		$typeA = $row[1];
		
		if($choice == 1 or $choice == 3){
			if($typeA){				
				if(!isset($types[$typeA])){
					$types[$typeA] = $cpt;
					$r[$types[$typeA]]['types'] = $typeA;
					$cpt++;
					$r[$types[$typeA]]['value'] = 1;
				}else{
					$r[$types[$typeA]]['value']++;
				}
			}
		}
		
		if($choice == 2 or $choice == 3){
			if(!isset($types[$type])){
					$types[$type] = $cpt;
					$r[$types[$type]]['types'] = $type;
					$cpt++;
					$r[$types[$type]]['value'] = 1;
				}else{
					$r[$types[$type]]['value']++;
				}
		}
	}

	mysqli_free_result($result);
	
	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");

	// Renvoyer le résultat au javascript
	echo json_encode($r);

?>