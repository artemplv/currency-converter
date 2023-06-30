import WorldMap from './scripts/map';

const canvas = document.querySelector('#map canvas');

const map = new WorldMap(canvas);
map.initialize();
