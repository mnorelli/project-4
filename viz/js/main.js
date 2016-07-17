console.log("Linked.");
window.onload = function(){



}

var start_loc = [-122.5554883, 37.8664909]

function initPano() {
  mapDraw();
  console.log({lat: start_loc[1],lon: start_loc[0]})
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: {lat: start_loc[1],lng: start_loc[0]},
        pov: {
          heading: 34,
          pitch: 10
        },
        addressControl: false,
        linksControl: true,
        panControl: false,
        enableCloseButton: false
      });
  // map.setStreetView(panorama);
}

function mapDraw(){
  mapboxgl.accessToken = 'pk.eyJ1IjoibW5vcmVsbGkiLCJhIjoiU3BCcTNJQSJ9.4EsgnQLWdR10NXrt7aBYGw';
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: start_loc, // starting position
    zoom: 11 // starting zoom
  });
  map.addControl(new mapboxgl.Geocoder());
}
