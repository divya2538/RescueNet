import { map } from './map.js';

const route = [
  [12.9165,79.1325],
  [12.9180,79.1340],
  [12.9200,79.1360],
  [12.9230,79.1400]
];

const ambulance = L.marker(route[0]).addTo(map);

let index = 0;

function animateAmbulance() {

  if(index >= route.length) return;

  ambulance.setLatLng(route[index]);

  index++;

}

setInterval(animateAmbulance, 2000);
