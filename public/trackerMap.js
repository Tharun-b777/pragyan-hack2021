

let plat=parseFloat($('#personLat').text());
let plong=parseFloat($('#personLong').text());
let map;

$('#gmapsurl').attr("href",`https://www.google.com/maps/search/?api=1&query=${plat},${plong}`)

let initMap=()=>{
	console.log('ahe')
    // getLocation();
    funct();
}
function getLocation() {
	console.log('why')
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,positionFail);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	const latitude  = position.coords.latitude;
	const longitude = position.coords.longitude;
	plot(latitude,longitude)
}

function positionFail(){
	console.log("failed");
}

function plot(latitude,longitude) {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: latitude, lng: longitude },             
		zoom: 12,
	});
	mark = new google.maps.Marker({
		position:{lat:latitude, lng:longitude}, 
		map:map
	});
}

function funct(){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(makeDirection,positionFail);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}
}

async function makeDirection(position){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
	const lat1  = position.coords.latitude;
    const long1 = position.coords.longitude;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 41.85, lng: -87.65 },
    });
    await directionsService.route(
        {
          origin: {lat: lat1, lng: long1},
          destination: {lat: plat, lng: plong},
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            }
        }
    );
    directionsRenderer.setMap(map);
}

window.initialize = initMap;

initMap();