import feather from 'feather-icons';
import WorldMap from './scripts/map';
import { displayInputs } from './scripts/inputs';

import './scripts/monkeyPatching';
import './scripts/handleModals';

const mapCanvas = document.querySelector('#map');
const tooltipCanvas = document.querySelector('#map-tooltip');

const map = new WorldMap(mapCanvas, tooltipCanvas, displayInputs);
map.initialize();

feather.replace();
