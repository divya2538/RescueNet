const map = L.map('map').setView([12.9165, 79.1325], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let userMarker;

navigator.geolocation.getCurrentPosition((position) => {

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  map.setView([lat, lng], 15);

  userMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup('Your Current Location')
    .openPopup();

  loadNearbyServices(lat, lng);

});

async function loadNearbyServices(lat, lng) {

  const services = [
    'hospital',
    'police',
    'fuel',
    'car_repair'
  ];

  services.forEach(service => {

    const marker = L.circleMarker([
      lat + Math.random() * 0.01,
      lng + Math.random() * 0.01
    ], {
      color: 'cyan'
    }).addTo(map);

    marker.bindPopup(service.toUpperCase());

  });

}

export { map };
