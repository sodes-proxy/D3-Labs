var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var flag = true;

var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var group = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0]);

var x_group = group.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")

var y_group = group.append("g")
    .attr("class", "y axis")

var y_label = group.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");

d3.json("data/revenues.json").then((data)=> {
    console.log("Update Functions");
    
	data.forEach((d)=>{
		d.revenue = +d.revenue;
        d.profit= +d.profit;
	});
    console.log(data);
    
    
    d3.interval( ( ) => {
		update(data);
        flag = !flag;
	}, 1000);
    update(data);
        
}).catch((error)=> {
    console.log(error);
});

function update(data) {
    
    var value = flag ? "revenue" : "profit";
    
    x.domain(data.map((d) => { return d.month; }))
    y.domain([0, d3.max(data, (d) => { return d[value]; })])

    var bottomAxis = d3.axisBottom(x);
    
    x_group.call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("filled", "white")
    .attr("text-anchor", "middle");
    
    var leftAxis = d3.axisLeft(y)
        .ticks(11)
	    .tickFormat((d) => { return "$" + + d/1000 + "K"; });

    y_group.call(leftAxis);

    group.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-20, -50)")
    .text("Month");

    var label = flag ? "Revenue" : "Profit";
    y_label.text(label)

    var revenues = group.selectAll("rect").data(data);
    revenues.exit().remove();
    revenues.attr("x", (d) => { return x(d.month); })
	    .attr("y", (d) => { return y(d[value]); })
	    .attr("width", x.bandwidth)
	    .attr("height",(d) => { return height - y(d[value])});
    revenues.enter()
        .append("rect")
            .attr("x", (d) => {
                return x(d.month);
            })
            .attr("y", (d) => {
                return y(d[value]);
            })
            .attr("height", (d) => {
                return height - y(d[value]);
            })
            .attr("width", x.bandwidth())
            .attr("fill", "yellow");

}