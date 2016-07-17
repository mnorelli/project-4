x = {lng: -122, lat: 34};
console.log(x, switch_coords(x,"array"))
x = [-122,34]
console.log(x, switch_coords(x,"object"))
x = {lat: 34, lng:-122}
console.log(x, switch_coords(x,"array"))
x = [34,-122]
console.log(x, switch_coords(x,"object"))

function switch_coords(coords,type){
  var result = [];
  var first_key = '';
  if (Array.isArray(coords)) {
    result.push(coords[0]);
    if (coords[0] < 0) {var first_key = "lng";}
    result.push(coords[1]);
  } else {
    var first_key = Object.keys(coords)[0]
    for (key in coords) { 
      result.push(coords[key])
    }
  }
  console.log(first_key)
  if (type == "array") {
    return [result[1],result[0]]
  } else {
    return first_key == 'lng' ? {lat:result[1],lng:result[0]} : {lng:result[1],lat:result[0]}
  }
}