// set up map variables

var mapCenter = [31.51073, -96.4247];
var mapZoom = 3;

// createMap

var myMap = L.map("map", {
  center: mapCenter,
  zoom: mapZoom,
});

// create background tile layer

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    mapZoom: 8,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
).addTo(myMap);

// establish marker size based on magnitudes

function markerSize(magnitude) {
  return magnitude * 11000;
}

// establish colors based on earthquake depths

function markerColor(depth) {
  if (depth < 10) color = "#ccffe5";
  else if (depth < 30) color = "b2ff66";
  else if (depth < 50) color = "ffff00";
  else if (depth < 70) color = "ff8000";
  else if (depth < 90) color = "ff0000";
  else color = "990000";
  return color;
}

// make geojson connection and grab the data for a month

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(url, (response) => {
  var earthquakes = response.features;

// loop through and create a marker for each earthquakes
earthquakes.forEach((earthquake) => {
  var longitude = earthquake.geometry.coordinates[0];
  var latitude = earthquake.geometry.coordinates[1];
  var depth = earthquake.geometry.coordinates[2];
  var magnitude = earthquake.properties.mag;
  
  
  var marker = L.circle([latitude, longitude], {
    fillOpacity: 0.75,
    color: "black",
    weight: 1,
    fillColor: markerColor(depth),
    radius: markerSize(magnitude),
  })
    .bindPopup(
      "<h2>" +
        earthquake.properties.place +
        "</h2><h3>Magnitude: " +
        magnitude +
        "<h3>Depth: " +
        depth
    )
    .addTo(myMap);
});

//create a legend and place it on the bottom right of the map

var legend = L.control({ position: "bottomright" });
  legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML +=
      '<i style="background: #"ccffe5"></i><span> -10 to 10</span><br>';
    div.innerHTML +=
      '<i style="background: #b2ff66"></i><span>10 to 30</span><br>';
    div.innerHTML +=
      '<i style="background: #ffff00"></i><span>30 to 50</span><br>';
    div.innerHTML +=
      '<i style="background: #ff8000"></i><span>50 to 70</span><br>';
    div.innerHTML +=
      '<i style="background: #ff0000"></i><span>70 to 90</span><br>';
    div.innerHTML += '<i style="background: #990000"></i><span>90 +</span><br>';

    return div;
  };

  legend.addTo(myMap);
});



