console.log("Linked.");
window.onload = function(){

  mapDraw();

}

function mapDraw(){
  mapboxgl.accessToken = 'pk.eyJ1IjoibW5vcmVsbGkiLCJhIjoiU3BCcTNJQSJ9.4EsgnQLWdR10NXrt7aBYGw';
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
  });
  map.addControl(new mapboxgl.Geocoder());
}