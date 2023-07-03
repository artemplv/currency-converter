import './scripts/monkeyPatching';
import WorldMap from './scripts/map';
import { displayInputs } from './scripts/inputs';

const mapCanvas = document.querySelector('#map');
const tooltipCanvas = document.querySelector('#map-tooltip');

const map = new WorldMap(mapCanvas, tooltipCanvas, displayInputs);
map.initialize();
