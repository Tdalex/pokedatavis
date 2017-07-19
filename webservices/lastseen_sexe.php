<?php
	// Le tableau de résultat
	$result_request = array();
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	
	$query = "select sexe, count(sexe) from user, lastseen where lastseen.user_id = user.id_user group by sexe";
	
	$result = mysqli_query($conn, $query);

	$types["Homme"] = 0;
	$types["Femme"] = 0;
	$all = 0;
	
	while ($row = mysqli_fetch_array($result)) {		
		$all += $row[1];
		if($row[0] == 1){
			$types["Homme"] = $row[1];
		}else{
			$types["Femme"] = $row[1];		
		}
	}

	mysqli_free_result($result);
	
	foreach($types as $key => $value){
		$result_request[] = array($key, intval($value/$all*100));
		// $result_request[] = array($key, $value);
	}

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");

	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>