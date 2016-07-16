console.log("Linked.");
window.onload = function(){

  mapDraw();

}

var san_francsico = [-122.524264, 37.855595]

function mapDraw(){
  mapboxgl.accessToken = 'pk.eyJ1IjoibW5vcmVsbGkiLCJhIjoiU3BCcTNJQSJ9.4EsgnQLWdR10NXrt7aBYGw';
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: san_francsico, // starting position
    zoom: 11 // starting zoom
  });
  map.addControl(new mapboxgl.Geocoder());
}