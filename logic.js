// Set a query URL for All Earthquakes Over the Last 30 Days
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
 
// Perform a get request to the query URL
d3.json(queryURL, function(data) {
    // Once we get a response, send the data.features object to the CreateFeatures function
    createFeatures(data.features);
});
