var svg = d3.select("#chart-area").append("svg")
	.attr("width", 1200)
	.attr("height", 1200);
max_height=0;
d3.json("data/buildings.json").then((data)=> {
	data.forEach((d)=>{
		d.height = +d.height;
        if(d.height>max_height){
            max_height=d.height;
        }
	});
    console.log(data);
	var buildings=svg.selectAll("rect").data(data);
    buildings.enter()
        .append("rect")
	    .attr("x",(d,i)=>{return (i*50)+20;})
	    .attr("y",(d)=>{return max_height-d.height;})
	    .attr("height", (d)=>{return d.height;})
        .attr("width",30)
	    .attr("fill","black");
}).catch((error)=>{
    console.log(error);
});