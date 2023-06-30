import WorldMap from './scripts/map';

const mapCanvas = document.querySelector('#map');
const tooltipCanvas = document.querySelector('#map-tooltip');

const map = new WorldMap(mapCanvas, tooltipCanvas);
map.initialize();
