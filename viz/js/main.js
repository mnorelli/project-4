window.onload = function(){

  // add map
  mapDraw();  

  // listener on Google Street View, needs to be added after the rest of the JS loads since it calls mapObj
  panoObj.panorama.addListener('pano_changed', function() {
    // Move the map pointer to the new pano coords 
    new_point = [panoObj.panorama.getPosition().lng(),panoObj.panorama.getPosition().lat()];
    mapObj.movePoint(new_point);  
  });

}  // end of window.onload

// starting location in Marin County, MapBox order = lnglat, Google order = latlng
var start_loc_mapbox = [-122.5554883, 37.8664909];
var start_loc_google = switch_coords(start_loc_mapbox,"object");

// make maps into objects so access to them won't be limited by scope
var mapObj = {};
var panoObj = {};

// Street View pano, fires from script call in index
function initPano() {
  panoObj.panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      // position: start_loc_google,  
      position: start_loc_google,
      pov: {
        heading: 34,
        pitch: 10
      },
      // remove default Street View controls
      addressControl: false,
      linksControl: true,
      panControl: false,
      enableCloseButton: false
    });
}

// MapBox map, geocoder control, point
function mapDraw(){
  // make map object
  mapboxgl.accessToken = 'pk.eyJ1IjoibW5vcmVsbGkiLCJhIjoiU3BCcTNJQSJ9.4EsgnQLWdR10NXrt7aBYGw';
  mapObj.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: start_loc_mapbox, // starting position
    zoom: 17 // starting zoom
  });

  // add geocoder search box
  mapObj.map.addControl(new mapboxgl.Geocoder());

  // add initial point symbol on map
  mapObj.point = {"type": "FeatureCollection",
    "features": [{"type": "Feature",
      "geometry": {"type": "Point","coordinates": start_loc_mapbox
        }
    }]
  };

  // wait for map load to add point (prevents "Style is not yet loaded" error)
  mapObj.map.on('load', function () {
    // with point at center of default map
    mapObj.map.addSource('point', {
        "type": "geojson",
        "data": mapObj.point
    });
    mapObj.map.addLayer({
        "id": "point",
        "source": "point",
        "type": "symbol",
        "layout": {
            "icon-image": "airport-15",
            "icon-rotate": 90
        }
    });
  });

  mapObj.movePoint = function(coords){
    // change the point data and update the source layer to read in the new point
    mapObj.point.features[0].geometry.coordinates = coords;
    mapObj.map.getSource('point').setData(mapObj.point);
  }

  // Using Street View Service, look for a nearby Street View panorama when the map is clicked.
  // getPanoramaByLocation will return the nearest pano when the
  // given radius is 50 meters or less.
  mapObj.map.on('click', function(event) {
    var sv = new google.maps.StreetViewService();
    sv.getPanorama({location: switch_coords(event.lngLat,"object"), radius: 50}, processSVData);
  });

}  // end of mapDraw   ********************************************

// returns Street View pano
function processSVData(data, status) {
  if (status === google.maps.StreetViewStatus.OK) {
    panoObj.panorama.setPano(data.location.pano);
    panoObj.panorama.setPov({
      heading: 270,  // refactor:  point this in the trail direction
      pitch: 0
    });
    panoObj.panorama.setVisible(true);
    mapObj.movePoint([data.location.latLng.lng(),data.location.latLng.lat()])
  } else {
    console.error('Street View data not found for this location.');
  }
}

// converts between MapBox and Google coordinates
// if type is not passed in as "array", it will output an object
// assumes negative values are longitude
function switch_coords(coords,type){
  var result = [];  // array to hold initial coords
  var first_key = '';  // track if the first coord is negative, meaning a longitude (in western hemisphere)
  if (Array.isArray(coords)) {  // deal with arrays
    result.push(coords[0]);
    if (coords[0] < 0) {var first_key = "lng";}  // first coord is negative
    result.push(coords[1]);
  } else {                     // deal with objects
    var first_key = Object.keys(coords)[0]
    for (key in coords) { 
      result.push(coords[key])
    }
  }
  if (type == "array") {
    return [result[1],result[0]]
  } else {
    return first_key == 'lng' ? {lat:result[1],lng:result[0]} : {lng:result[1],lat:result[0]}
  }
}
