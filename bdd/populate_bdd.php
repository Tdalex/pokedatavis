<?php
	include("../bdd/connexion_bdd.php");
	
	for($i =0; $i < 128; $i++){
		$query = "INSERT INTO `user` (`Login`, `Password`, `sexe`) VALUES ('test', 'test', '". mt_rand(0,1)."');";
		$result = mysqli_query($conn, $query);	
		mysqli_free_result($result);
	}	
	
	for($i =0; $i < 300; $i++){
		$int= mt_rand(1262055681, strtotime("now"));
		$date = date("Y-m-d H:i:s",$int);
		$query = "INSERT INTO `lastseen` (`Pokemon_Id_Pokemon`, `Date`, `user_id`) VALUES ('". mt_rand(1,151)."', '".$date."', '". mt_rand(1,128)."');";
		$result = mysqli_query($conn, $query);
		mysqli_free_result($result);
	}	
	
	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
?>