function init() {
  var selector = d3.select("#selDataset");
  
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);

    });

  })}

function optionChanged(newSample) {
  buildMetadata(newSample);
  //buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
 
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}:${value}`);
        console.log(PANEL)
    });
  });
};

  //

function buildCharts(sample) {
//   // First get data
   d3.json("samples.json").then((data) => {
     var sampleInfo = data.samples;
     var selectedSample = sampleInfo.filter(sampleObj => sampleObj.id == sample);

//     // sort data by sample_values
//     //var sortedSamples = selectedSample.sort((a,b) => d3.descending(a.sample_values, b.sample_values));
//     //var samples = data.samples.filter(samples => samples.id.toString() === id)[0];
     var sampleValue = selectedSample.map(value=>value.sample_values);
     var arrayValue = sampleValue.slice(0,10);

     var otus = selectedSample.map(value=>value.otu_ids);
     //var otuid = otus.slice(0,10);
      
//     // slice the first 10 objects
//     //sortedSamples = sortedSamples.slice(0,10);
      
    var trace = {
        //x: sortedSamples.map(row => row.otu_ids),
       // y: sortedSamples.map(row => row.sample_values),
      x: arrayValue,
      y: otus,
      type: "bar"
    };

    console.log(trace.x);
    console.log("this working")

    //var data = [trace];
    var layout = {
    title: "Top 10",
    xaxis: { title: "OTUs" },
    yaxis: { title: "Values"}
    };
    Plotly.newPlot("bar", trace, layout);
  }); //END d3.json()  
} //END buildCharts()
//}; // END optionChanged()

init();