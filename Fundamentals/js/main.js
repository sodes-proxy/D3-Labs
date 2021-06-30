var svg = d3.select("#chart-area").append("svg")
	.attr("width", 600)
	.attr("height", 600);
var circle = svg.append("circle")
	.attr("cx", 140)
	.attr("cy", 200)
	.attr("r", 97)
	.attr("fill", "yellow");
var rect = svg.append("rect")
	.attr("x", 35)
	.attr("y", 30)
	.attr("width", 200)
	.attr("height", 100)
	.attr("fill","black");