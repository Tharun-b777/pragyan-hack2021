
let map;

let initMap=()=>{
	console.log('ahe')
	getLocation();
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

function createPerson(position){
	$.post("http://localhost:3000/create",
	{
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	},
	function(data, status){
		console.log(data.id)
		console.log("Data: " + data + "\nStatus: " + status);
	});
}

function positionFail(){
	console.log("failed");
}

function plot(latitude,longitude) {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: latitude, lng: longitude },             
		zoom: 8,
	});
	mark = new google.maps.Marker({
		position:{lat:latitude, lng:longitude}, 
		map:map
	});
}

$("#clicker").on('click',()=>{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createPerson,positionFail);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}	
})

window.initialize = initMap;

initMap();
