import {
  geoOrthographic,
  geoPath,
  geoContains,
} from 'd3-geo';

import {
  pointer,
} from 'd3-selection';

const MAP_CONSTANTS = {
  defaultScale: 250,
  maxScale: 1800,
  minScale: 130,
  defaultRotation: [0, 0],
  rotationModifier: 0.3,
  // eslint-disable-next-line max-len
  geojsonUrl: 'https://gist.githubusercontent.com/artemplv/be8ebf292a4433944f3948b06732a6cc/raw/cd2e417144d0d1b0fd10888b4de01b373ad49d5e/110m_countries.json',
  defaultFillColor: '#fff',
  selectedFillColor: '#ff571b',
  strokeColor: '#cbcbcb',
  strokeLineWidth: 0.45,
};

class WorldMap {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    //
    this.scale = MAP_CONSTANTS.defaultScale;
    this.rotation = MAP_CONSTANTS.defaultRotation;
    //
    this.geojson = {};
    this.state = { clickedLocation: null };
    //
    this.dragStartedTime = null;
    //
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    //
    this.projection = geoOrthographic();
    this.geoGenerator = geoPath().projection(this.projection).context(this.ctx);
    //
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('wheel', this.handleZoom);
  }

  get clickedLocation() {
    return this.state.clickedLocation;
  }

  set clickedLocation(location) {
    this.state.clickedLocation = location;
  }

  update() {
    const {
      projection,
      ctx,
      width,
      height,
      geojson,
      scale,
      rotation,
      geoGenerator,
      clickedLocation,
    } = this;

    projection.fitSize([width, height], geojson);
    projection.scale(scale);
    projection.rotate(rotation);

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < geojson.features.length; i += 1) {
      const d = geojson.features[i];

      ctx.beginPath();

      ctx.lineWidth = MAP_CONSTANTS.strokeLineWidth;
      ctx.strokeStyle = MAP_CONSTANTS.strokeColor;
      ctx.fillStyle = clickedLocation && geoContains(d, clickedLocation)
        ? MAP_CONSTANTS.selectedFillColor
        : MAP_CONSTANTS.defaultFillColor;

      geoGenerator(d);

      ctx.stroke();
      ctx.fill();
    }
  }

  handleMouseDown() {
    this.dragStartedTime = Date.now();
  }

  handleMouseMove(event) {
    const {
      dragStartedTime,
      scale,
      rotation,
    } = this;

    if (dragStartedTime) {
      const modifier = scale > 800 ? 0.1 : MAP_CONSTANTS.rotationModifier;

      const dx = event.movementX * modifier;
      const dy = event.movementY * modifier;
      const [x, y] = rotation;

      this.rotation = [(x + dx) % 360, (y - dy) % 360];

      this.update();
    }
  }

  handleMouseUp(event) {
    const {
      dragStartedTime,
      projection,
    } = this;

    if (!dragStartedTime || (Date.now() - dragStartedTime < 150)) {
      const pos = pointer(event, this);
      this.clickedLocation = projection.invert(pos);

      this.update();
    }

    this.dragStartedTime = null;
  }

  handleZoom(event) {
    event.preventDefault();

    if (event.ctrlKey) {
      this.scale -= event.deltaY * 0.5;

      if (this.scale > MAP_CONSTANTS.maxScale) {
        this.scale = MAP_CONSTANTS.maxScale;
      }
      if (this.scale < MAP_CONSTANTS.minScale) {
        this.scale = MAP_CONSTANTS.minScale;
      }

      this.update();
    }
  }

  async initialize() {
    const response = await fetch(MAP_CONSTANTS.geojsonUrl);
    this.geojson = await response.json();

    this.update();
  }
}

export default WorldMap;
