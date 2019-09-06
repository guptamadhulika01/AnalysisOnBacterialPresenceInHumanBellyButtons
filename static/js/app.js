function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
    const metadataurl = "/metadata/" +sample;

    d3.json(metadataurl).then((data) =>{
    // Use d3 to select the panel with id of `#sample-metadata`
  
    metadatapanel = d3.select("#sample-metadata"); 

    // Use .html("") to clear any existing metadata
    metadatapanel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
 
     Object.entries(data).forEach(([key, value]) => {metadatapanel.append("p").text(`${key}:${value}`);
      
     });
      
    });
  }

  
function buildCharts(sample) {
  //"/samples/<sample>"
  const sampleDataurl = "/samples/" + sample; 

// @TODO: Use `d3.json` to fetch the sample data for the plots
 
  d3.json(sampleDataurl).then((sample) => {
  /*
    for (var i = 0; i < sample.otu_ids.length; i++) {
      results.push({
        "otu_ids": sample.otu_ids[i], "otu_labels": sample.otu_labels[i], "sample_values": sample.sample_values[i]
      });

    results.sort((a,b)=> b.sample_values - a.sample_values);
    results.slice(0,10); 
  //console.log(results);

  };
*/
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace2 = {

      values: sample.sample_values.slice(0,10),
      labels: sample.otu_ids.slice(0, 10),
      hovertext: sample.otu_labels.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
      //orientation: "h"

    };
    var pielayout = {
      height : 600, 
      width : 600
    }
    var pieChart = [trace2];

    Plotly.newPlot("pie", pieChart, pielayout);
    bubbleChartData = d3.select("#bubble");
    bubbleChartData.html("");
    var trace1 = {
      x: sample.otu_ids,
      y: sample.sample_values,

      type: "scatter",
      color: sample.otu_ids,
      text: sample.otu_labels,
      mode: "markers",
      marker: {
        color: "#2077b4",
        symbol: "hexagrams",
        size: sample.sample_values,
      }
    };

    var bubbleChart = [trace1];
    Plotly.newPlot("bubble", bubbleChart);
  //Plotly.newPlot("bubble", bubbleChart);

  });
}
  // @TODO: Build a Bubble Chart using the sample data

  /*   As per instructions
  * Use `otu_ids` for the x values.
  * Use `sample_values` for the y values.
  * Use `sample_values` for the marker size.
  * Use `otu_ids` for the marker colors.
  * Use `otu_labels` for the text values.
*/
  

 

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample){
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  buildMetadata(newSample);

}
// Initialize the dashboard
init();
