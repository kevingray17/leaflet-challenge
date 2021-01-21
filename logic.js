// set up map variables

var mapCenter = [31.51073, -96.4247];
var mapZoom = 6;

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
    maxZoom: 18,
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

// pull the geoJSON data

var url = 