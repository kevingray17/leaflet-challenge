// create a query variable

var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// grab some data

d3.json(queryURL, function(data) {

  createFeatures(data.features);
  console.log(data.features)

});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties + 
    "</h3><hr><p>" + feature.properties.time) + "</p>";
  }
function radiusSize(magnitude) {
  return magnitude * 20000;
}

function circleColor(magnitude) {
  if (magnitude < 1) {
    return ""
  }



