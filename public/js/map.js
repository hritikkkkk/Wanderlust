mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/dark-v1", // style URL
  center: Listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const markar = new mapboxgl.Marker({})
  .setLngLat(Listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `${Listing.title}<h4><p>Exact loaction will be provided after booking</p></h4>`
    )
  )
  .addTo(map);
