import {
  geoOrthographic,
  geoPath,
  geoContains,
} from 'd3-geo';

import { pointer } from 'd3-selection';

import handleTooltip from './handleTooltip';

const MAP_CONSTANTS = {
  defaultScale: 250,
  maxScale: 1800,
  minScale: 130,
  defaultRotation: [0, 0],
  rotationModifier: 0.3,
  // eslint-disable-next-line max-len
  geojsonUrl: 'https://gist.githubusercontent.com/artemplv/be8ebf292a4433944f3948b06732a6cc/raw/95e446a098596eb51cc9734e8b9e12ec8e1781d9/110m_countries.json',
  defaultFillColor: '#fff',
  selectedFillColor: '#ff571b',
  hoveredFillColor: 'rgb(255, 240, 72)',
  strokeColor: '#cbcbcb',
  strokeLineWidth: 0.45,
  outlineColor: '#ccc',
  oceanFillColor: 'rgb(14, 90, 197)',
};

class WorldMap {
  constructor(mapCanvas, tooltip, onCountriesChange) {
    this.canvas = mapCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    //
    this.tooltip = tooltip;
    //
    this.scale = MAP_CONSTANTS.defaultScale;
    this.rotation = MAP_CONSTANTS.defaultRotation;
    //
    this.geojson = {};
    this.state = {
      clickedLocation: null,
      hoveredLocation: null,
      selectedCountries: [],
    };
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
    //
    this.onCountriesChange = onCountriesChange;
  }

  get clickedLocation() {
    return this.state.clickedLocation;
  }

  set clickedLocation(location) {
    this.state.clickedLocation = location;
  }

  get hoveredLocation() {
    return this.state.hoveredLocation;
  }

  set hoveredLocation(location) {
    this.state.hoveredLocation = location;
  }

  get selectedCountries() {
    return this.state.selectedCountries;
  }

  isCountrySelected(country) {
    return this.state.selectedCountries.findIndex((item) => item.name === country.name) > -1;
  }

  addToSelectedCountries(country) {
    if (!this.isCountrySelected(country)) {
      this.state.selectedCountries.push(country);
    }

    this.onCountriesChange(this.selectedCountries);

    return this.state.selectedCountries;
  }

  removeFromSelectedCountries(country) {
    this.state.selectedCountries = this.state.selectedCountries.filter((item) => item.name !== country.name);

    this.onCountriesChange(this.selectedCountries);

    return country;
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
      hoveredLocation,
      tooltip,
    } = this;

    // clear canvas and tooltip
    ctx.clearRect(0, 0, width, height);
    handleTooltip.hide(tooltip);

    // prepare projection
    projection.fitSize([width, height], geojson);
    projection.scale(scale);
    projection.rotate(rotation);

    // draw globe outline and fill oceans
    ctx.beginPath();
    ctx.strokeStyle = MAP_CONSTANTS.outlineColor;
    ctx.fillStyle = MAP_CONSTANTS.oceanFillColor;
    geoGenerator({ type: 'Sphere' });
    ctx.stroke();
    ctx.fill();

    // iterate over countries and draw them
    for (let i = 0; i < geojson.features.length; i += 1) {
      const d = geojson.features[i];

      ctx.beginPath();

      ctx.lineWidth = MAP_CONSTANTS.strokeLineWidth;
      ctx.strokeStyle = MAP_CONSTANTS.strokeColor;
      ctx.fillStyle = MAP_CONSTANTS.defaultFillColor;

      if (hoveredLocation && geoContains(d, hoveredLocation)) {
        ctx.fillStyle = MAP_CONSTANTS.hoveredFillColor;
        handleTooltip.show(tooltip, d.properties.name);
      }

      if (this.isCountrySelected(d.properties)) {
        ctx.fillStyle = MAP_CONSTANTS.selectedFillColor;
      }

      if (clickedLocation && geoContains(d, clickedLocation)) {
        // add or remove country from list of selected countries and choose the right color
        if (this.isCountrySelected(d.properties)) {
          // remove country from selected
          this.removeFromSelectedCountries(d.properties);
          ctx.fillStyle = MAP_CONSTANTS.defaultFillColor;
        } else {
          // add country to selected
          this.addToSelectedCountries(d.properties);
          ctx.fillStyle = MAP_CONSTANTS.selectedFillColor;
        }

        this.clickedLocation = null;
      }

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
    } else {
      const pos = pointer(event, this.canvas);
      this.hoveredLocation = this.projection.invert(pos);
    }

    this.update();
  }

  handleMouseUp(event) {
    const {
      dragStartedTime,
      projection,
    } = this;

    if (!dragStartedTime || (Date.now() - dragStartedTime < 150)) {
      const pos = pointer(event, this.canvas);
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