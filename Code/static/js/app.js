// // Build the metadata panel
// function buildMetadata(sample) {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // get the metadata field
//     let metadata = data.metadata;

//     // Filter the metadata for the object with the desired sample number
//     let metadata_array = metadata.filter(sampleObject => sampleObject.id == sample);
//     let desired_object = metadata_array[0];

//     // Use d3 to select the panel with id of `#sample-metadata`
//     let panel = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     panel.html("");

//     // Inside a loop, you will need to use d3 to append new
//     // tags for each key-value in the filtered metadata.
//     for(property in desired_object) {
//       panel.append("h6").text(`${property.toUpperCase()}:${desired_object[property]}`);
//     }

//   });
// }

// // function to build both charts
// function buildCharts(sample) {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // Get the samples field
//     let samples_field = data.samples;

//     // Filter the samples for the object with the desired sample number
//     let samples_array = samples_field.filter(samplesObject => samplesObject.id == sample);
//     let desired_object = samples_array[0];

//     // Get the otu_ids, otu_labels, and sample_values
//     let otu_ids = desired_object.otu_ids;
//     let otu_labels = desired_object.otu_labels;
//     let sample_values = desired_object.sample_values;

//     // Build a Bubble Chart
//     let bubble_layout = {
//       title : "Bacteria Bubble Chart",
//       margin : {t:0},
//       hovermode: "closest",
//       xaxis: {title:"Otu Id"},
//       yaxis: {title: "# of Bacteria"}
//     }

//     // Render the Bubble Chart
//     Plotly.newPlot("bubble", [bubble_trace], bubble_layout);

//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
//     let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();

//     // Build a Bar Chart
//     // Don't forget to slice and reverse the input data appropriately
//     let bar_trace = {
//       x: sample_values.slice(0, 10).reverse(),
//       y: yticks,
//       text: otu_labels.slice(0, 10).reverse(),
//       type: "bar",
//       orientation: "h"
//     };
//     let bar_layout = {
//       title: "Top 10 Bacteria Cultures Found",
//       margin: { t: 30, l: 100 }
//     };

//     // Render the Bar Chart
//     Plotly.newPlot("bar", [bar_trace], bar_layout);

//   });
// }

// // Function to run on page load
// function init() {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // Get the names field
//     let names = data.names;

//     // Use d3 to select the dropdown with id of `#selDataset`
//     let dropdown = d3.select("#selDataset");

//     // Use the list of sample names to populate the select options
//     // Hint: Inside a loop, you will need to use d3 to append a new
//     // option for each sample name.
//     names.forEach((name) => {
//       dropdown.append("option").text(name).property("value", name);
//     });

//     // Get the first sample from the list
//     let first_sample = names[0];

//     // Build charts and metadata panel with the first sample
//     buildCharts(first_sample);
//     buildMetadata(first_sample);
//   });
// }

// // Function for event listener
// function optionChanged(newSample) {
//   // Build charts and metadata panel each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }

// // Initialize the dashboard
// init();

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let metadata = data.metadata;
    let metadata_array = metadata.filter(sampleObject => sampleObject.id == sample);
    let desired_object = metadata_array[0];
    let panel = d3.select("#sample-metadata");
    panel.html("");
    
    for (let property in desired_object) {
      panel.append("h6").text(`${property.toUpperCase()}: ${desired_object[property]}`);
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let samples_field = data.samples;
    let samples_array = samples_field.filter(samplesObject => samplesObject.id == sample.toString());
    let desired_object = samples_array[0];
    
    // Ensure desired_object exists before accessing properties
    if (!desired_object) {
      console.error("No data found for sample:", sample);
      return;
    }
    
    let otu_ids = desired_object.otu_ids;
    let otu_labels = desired_object.otu_labels;
    let sample_values = desired_object.sample_values;
    
    // Build a Bubble Chart
    let bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };
    let bubble_layout = {
      title: "Bacteria Bubble Chart",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "# of Bacteria" }
    };
    // Render the Bubble Chart
    Plotly.newPlot("bubble", [bubble_trace], bubble_layout);
    
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let bar_trace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };
    let bar_layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 100 }
    };
    
    // Render the Bar Chart
    Plotly.newPlot("bar", [bar_trace], bar_layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let names = data.names;
    
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });
    
    // Get the first sample from the list
    let first_sample = names[0];
    
    // Build charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

