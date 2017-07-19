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
	
	getRequest("webservices/type_pokemon.php?type=1", function(data) {
		// generateBarChart("type_1", data);
		generateBarChartDivD3(data, "d3_barchart_1");
	});	
	
	getRequest("webservices/type_pokemon.php?type=2", function(data) {
		// generateBarChart("type_2", data);
		generateBarChartDivD3(data, "d3_barchart_2");
	});	
	getRequest("webservices/type_pokemon.php?type=3", function(data) {
		// generateBarChart("type_3", data);	
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
	
});