import {
  // geoEquirectangular,
  geoOrthographic,
  geoPath,
  geoContains,
} from 'd3-geo';

import {
  pointer,
} from 'd3-selection';

// eslint-disable-next-line max-len
const geojsonUrl = 'https://gist.githubusercontent.com/artemplv/be8ebf292a4433944f3948b06732a6cc/raw/cd2e417144d0d1b0fd10888b4de01b373ad49d5e/110m_countries.json';

const canvas = document.querySelector('#map canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

let geojson = {};

const state = {
  clickedLocation: null,
};

const mapScale = 180;
let mapRotation = [0, 0];

const mapRotationModifier = 0.4;

// const projection = geoEquirectangular();
const projection = geoOrthographic();

const geoGenerator = geoPath()
  .projection(projection)
  .context(ctx);

const update = () => {
  projection.fitSize([canvasWidth, canvasHeight], geojson);
  projection.scale(mapScale);
  projection.rotate(mapRotation);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < geojson.features.length; i += 1) {
    const d = geojson.features[i];

    ctx.beginPath();

    ctx.lineWidth = 0.45;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = state.clickedLocation && geoContains(d, state.clickedLocation) ? 'blue' : '#ccc';

    geoGenerator(d);

    ctx.stroke();
    ctx.fill();
  }
};

let dragStartedTime;

const handleMouseDown = () => {
  dragStartedTime = Date.now();
};

const handleMouseMove = (event) => {
  if (dragStartedTime) {
    const dx = Math.round(event.movementX * mapRotationModifier);
    const dy = Math.round(event.movementY * mapRotationModifier);
    const [x, y] = mapRotation;
    mapRotation = [(x + dx) % 360, (y - dy) % 360];

    update();
  }
};

function handleMouseUp(event) {
  if (!dragStartedTime || (Date.now() - dragStartedTime < 150)) {
    const pos = pointer(event, this);
    state.clickedLocation = projection.invert(pos);
    update();
  }

  dragStartedTime = null;
}

const initialize = () => {
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mousemove', handleMouseMove);
};

const drawMap = async () => {
  const response = await fetch(geojsonUrl);
  geojson = await response.json();

  initialize();
  update();
};

export default drawMap;
