import { map } from './map.js';

const heatData = [
  [12.9165,79.1325,0.8],
  [12.9180,79.1300,0.9],
  [12.9200,79.1350,0.7],
  [12.9250,79.1400,1.0]
];

const heat = L.heatLayer(heatData, {
  radius: 40,
  blur: 30,
  maxZoom: 17,
  gradient: {
    0.4: 'yellow',
    0.6: 'orange',
    0.9: 'red'
  }
}).addTo(map);
