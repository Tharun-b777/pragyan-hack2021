mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhZ3kiLCJhIjoiY2trMG93a3JhMGppYTJvcnJ6NHNjOTVzbiJ9.DshXzeUZDzRbt6-BA3Nb4A"

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
let plat=parseFloat($('#personLat').text());
let plong=parseFloat($('#personLong').text());
$('#gmapsurl').attr("href",`https://www.google.com/maps/search/?api=1&query=${plat},${plong}`)

setupMap([plat,plong]);