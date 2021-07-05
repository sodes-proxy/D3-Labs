var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var group= svg.append("g")
	.attr("transform","translate("+margin.left+","+margin.top+")");

d3.json("data/buildings.json").then((data)=> {
	data.forEach((d)=>{
		d.height = +d.height;
	});
    building_name=data.map((d)=>{return d.name});
    max_height=d3.max(data,(d)=>{return d.height});
    var x = d3.scaleBand()
	.domain(building_name)
	.range([0,400])
	.paddingInner(.3)
	.paddingOuter(.3);
    console.log(data);
    var y = d3.scaleLinear()
	.domain([0,max_height])
	.range([0,400]);
    var colors=d3.scaleOrdinal()
    .domain(building_name)
    .range(d3.schemeSet3);
    console.log(colors);
	var buildings=group.selectAll("rect").data(data);
    buildings.enter()
        .append("rect")
	    .attr("x",(d)=>{return x(d.name);})
	    .attr("y",(d)=>{return height-y(d.height);})
	    .attr("height", (d)=>{return y(d.height);})
        .attr("width",x.bandwidth())
	    .attr("fill",(d)=>{return colors(d.name)});
		var bottomAxis = d3.axisBottom(x);
		group.append("g")
			.attr("class", "bottom axis")
			.attr("transform", "translate(0, " + height+ ")")
			.call(bottomAxis)
			.selectAll("text")
    		.attr("y", "10")
	    	.attr("x", "-5")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-20)");
		var leftAxis = d3.axisLeft(y)
			.ticks(5)
			.tickFormat((d)=>{return d +" m";});
		group.append("g")
			.attr("class", "left axis")
			.call(leftAxis);
		group.append("text")
			.attr("class", "x axis-label")
			.attr("x", (width / 2))
			.attr("y", height + 140)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(-120, -50)")
			.text("The word's tallest buildings");
		group.append("text")
			.attr("class", "y axis-label")
			.attr("x", - (height / 2))
			.attr("y", -60)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.text("Height (m)");
}).catch((error)=>{
    console.log(error);
});