window.onload = function(){

  // make map object
  mapboxgl.accessToken = 'pk.eyJ1IjoibW5vcmVsbGkiLCJhIjoiU3BCcTNJQSJ9.4EsgnQLWdR10NXrt7aBYGw';
  mapObj.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: start_loc_mapbox, // starting position
    zoom: 11 // starting zoom
  });

  // call MapBox map
  mapDraw();  

  // listener on Google Street View
  panorama.addListener('pano_changed', function() {
    // Move the map pointer to the new pano coords 
    new_point = switch_coords(panorama.getPosition());  
    mapObj.point.features[0].geometry.coordinates = new_point;

    //debug
    window.map = Map;
    console.log(window.map)

    // Update the source layer
    mapObj.map.getSource('point').setData(mapObj.point);
  });

}  // end of window.onload


mapObj = {};
// starting location in Marin County, MapBox order = lonlat, Google order = latlon
var start_loc_mapbox = [-122.5554883, 37.8664909];
var start_loc_google = {lat:start_loc_mapbox[1], lng:start_loc_mapbox[0]};


function initPano() {
  // Street View pano
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
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

  // debug
  window.panorama = panorama;
}

// MapBox map
function mapDraw(){
  // with geocoder search box
  mapObj.map.addControl(new mapboxgl.Geocoder());

  // initial point symbol on map
  mapObj.point = {"type": "FeatureCollection",
    "features": [{"type": "Feature",
      "geometry": {"type": "Point","coordinates": start_loc_mapbox
        }
    }]
  };

  // when map loads (prevents "Style is not yet loaded" error)
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
}

function switch_coords(coords){
  if (Array.isArray(coords)) {
    return [coords[1],coords[0]]
  } else {
    return [coords.lng(),coords.lat()]
  }
}

