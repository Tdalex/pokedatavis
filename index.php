<!DOCTYPE html>
<html>
	<head>
		<title>Pokemon</title>
		<!-- Inclusion CSS (librairie + perso) -->
		<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css">
		<link rel="stylesheet" type="text/css" href="css/dataviz.css">
		
		<!-- Inclusion JS (librairie + scripts de création de graph) -->
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.jqplot.min.js"></script>
		<script type="text/javascript" src="js/d3.min.js"></script>
		<script type="text/javascript" src="https://d3js.org/d3.v4.js"></script>
		
		<script type="text/javascript" src="js/renderer/jqplot.pieRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.categoryAxisRenderer.js"></script>
		
		<script type="text/javascript" src="js/dataviz.js"></script>
		<style> /* set the CSS */
			.line {
			  fill: none;
			  stroke: steelblue;
			  stroke-width: 2px;
			}
		</style>
	</head>
	<body>
		<?php include ('structure/header.php'); ?>
		<div id="content">
			<h2>Pourcentage des pokemons par nombre de type</h2>
			<div id="nb_chart"></div>

			<h2>Répartitions des pokemons par type</h2>
			<form>
				<input checked type="radio" id="radioB" name="type" value="2">Premier type<br>
				<input type="radio" id="radioA" name="type" value="1">Deuxieme type<br>
				<input type="radio" id="radioC" name="type" value="3">Tout<br>
			</form>
			<div id='divB'>
				<h3>Premier type</h3>
				<svg width="1500" id="d3_barchart_2" height="500"></svg>
			</div>
			<div id='divA' >
				<h3>Deuxieme type</h3>
				<svg width="1500" id="d3_barchart_1" height="500"></svg>
			</div>
			<div id='divC'>
				<h3>Tout</h3>
				<svg width="1500" id="d3_barchart_3" height="500"></svg>
			</div>
		</div>

		<h2>Pourcentage des utilisateurs utilisant la focntionnalité 'vue dernièrement'</h2>
		<div id="sexe_chart"></div>
	
		<h2>Total de pokemon trouvé par les utilisateurs</h2>
		<svg width="1800" id="d3_mostview" height="500"></svg>
		
		<h2>Nombre de pokemon trouvé les 30 derniers jours</h2>
		<div id="d3_lastseen"></div>
	
		<?php include ('structure/footer.php'); ?>
	</body>
</html>