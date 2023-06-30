import WorldMap from './scripts/map';
import { displayCountries } from './scripts/countriesList';

const mapCanvas = document.querySelector('#map');
const tooltipCanvas = document.querySelector('#map-tooltip');

const map = new WorldMap(mapCanvas, tooltipCanvas, displayCountries);
map.initialize();
