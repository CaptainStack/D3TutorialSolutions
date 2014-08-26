var width = 800;
var height = 600;

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);
    
d3.tsv("data.tsv", convertToNumber, processData);

function processData(error, data) {
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barWidth + ")"; });

  bar.append("rect")
      .attr("width", barWidth)
      .attr("y", 0)
      .attr("height", function(d) { return y(d.value); });

  bar.append("text")
      .attr("x", barWidth)
      .attr("y", function(d) { return y(d.value) - 3; })
      .attr("dy", ".35em")
      .text(function(d) { return d.value; });
}

function convertToNumber(d) {
  d.value = +d.value; // coerce to number
  return d;
}