$(document).ready(function(){
	// Pas de cache sur les requête IMPORTANT !
	$.ajaxSetup({ cache: false });
	
	/*** 
		On définit ici les fonctions de base qui vont nous servir à la récupération des données
		Je ne définis que le GET ici, mais il est possible d'utiliser POST pour récupérer ses données (on le verra dans un prochain TP)
	****/
	function getRequest(url, callback) {
		$.get(url, function(data) {
			data = $.parseJSON(data);
			callback(data);
		});
	}
	
	function generatePieChart(idDivToFill, data){
		var plot1 = $.jqplot(idDivToFill, [data], {
			gridPadding: {top:0, bottom:5, left:0, right:0},
			seriesDefaults:{
				renderer:$.jqplot.PieRenderer, 
				trendline:{ show:false }, 
				rendererOptions: { padding: 5, showDataLabels: true, sliceMargin: 3, startAngle: -90 }
			},
			legend:{
				show:true, 
				placement: 'inside', 
				rendererOptions: {
					numberRows: data.length
				}, 
				location:'ne',
				marginTop: '5px'
			}       
		});
		
	}	

	function generateBarChartDivD3(data, idDivToFill) { 	
		var	svg = d3.select("#"+idDivToFill);
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom;
			
		var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1),
			y = d3.scaleLinear().rangeRound([height, 0]);
			
		var c = 200;

		var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		  x.domain(data.map(function(d) { return d.types; }));
		  y.domain([0, d3.max(data, function(d) { return d.value; })]);

		  g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .call(d3.axisBottom(x));

		  g.append("g")
			  .attr("class", "axis axis--y")
			  .call(d3.axisLeft(y))
			  .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", "0.71em")
			  .attr("text-anchor", "end")
			  .text("Nombre de pokemon par type");

		  g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			  .attr("class", "bar")
			  .attr("x", function(d) { return x(d.types); })
			  .attr("y", function(d) { return y(d.value); })
			  .attr("width", x.bandwidth())
			  .attr("height", function(d) { return height - y(d.value); })
			  .style("fill", function(d) {				
					c += 200;
					return c.toString(16);
				});
	}
	
	function generateDotChartDivD3(data, idDivToFill){		
		// set the dimensions and margins of the graph
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// parse the date / time
		var parseTime = d3.timeParse("%Y-%m-%d");

		// set the ranges
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		// define the line
		var valueline = d3.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.count); });

		var svg = d3.select("#"+idDivToFill)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// format the data
		data.forEach(function(d) {
		  d.date = parseTime(d.date);
		});

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain([0, d3.max(data, function(d) { return d.count; })]);

		// Add the valueline path.
		svg.append("path")
		  .data([data])
		  .attr("class", "line")
		  .attr("d", valueline);
		  
		// Add the scatterplot
		svg.selectAll("dot")
		  .data(data)
		.enter().append("circle")
		  .attr("r", 5)
		  .attr("cx", function(d) { return x(d.date); })
		  .attr("cy", function(d) { return y(d.count); });

		// Add the X Axis
		svg.append("g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x));

		// Add the Y Axis
		svg.append("g")
		  .call(d3.axisLeft(y));

	}
	
	getRequest("webservices/type_pokemon.php?type=1", function(data) {
		generateBarChartDivD3(data, "d3_barchart_1");
	});	
	
	getRequest("webservices/type_pokemon.php?type=2", function(data) {
		generateBarChartDivD3(data, "d3_barchart_2");
	});	
	
	getRequest("webservices/type_pokemon.php?type=3", function(data) {
		generateBarChartDivD3(data, "d3_barchart_3");
		$("#divA").hide();
		$("#divC").hide();			
	});	
	
	$('#radioA').click(function(){ 
		$("#divA").show();
		$("#divB").hide();
		$("#divC").hide();
	});
	
	$('#radioB').click(function(){ 
		$("#divA").hide();
		$("#divB").show();
		$("#divC").hide();
	});
	
	$('#radioC').click(function(){ 
		$("#divA").hide();
		$("#divB").hide();
		$("#divC").show();
	});
	
	getRequest("webservices/nb_type.php", function(data) {
		generatePieChart("nb_chart", data);
	});	
	
	getRequest("webservices/lastseen_sexe.php", function(data) {
		generatePieChart("sexe_chart", data);
	});	
	
	getRequest("webservices/most_view.php", function(data) {
		generateBarChartDivD3(data, "d3_mostview");
	});	
	
	getRequest("webservices/lastseen_date.php", function(data) {
		generateDotChartDivD3(data, "d3_lastseen");
	});	
	
});