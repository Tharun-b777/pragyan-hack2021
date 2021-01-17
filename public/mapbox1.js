mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhZ3kiLCJhIjoiY2trMG93a3JhMGppYTJvcnJ6NHNjOTVzbiJ9.DshXzeUZDzRbt6-BA3Nb4A"
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
  })
  
function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}
  
function errorLocation() {
    setupMap([100, 100])
}
  
function setupMap(center) {
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 15
    })
    var marker = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);

    const nav = new mapboxgl.NavigationControl()

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })
}

$("#clicker").on('click',()=>{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createPerson,positionFail);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}	
}) 