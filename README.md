# Currency Converter

This currency converter project is a tool designed to provide users with a seamless and visually engaging currency conversion experience. By leveraging an interactive globe visualization, users can explore and select currencies from different countries around the world.


<img width="600" alt="Project screen recording" src="https://github.com/artemplv/currency-converter/assets/48654322/a0a55073-e5d7-4248-863f-ccceacf616fe">

## Functionality & MVPs

Key features:

- Interactive globe visualization: Rotate and zoom the globe to select countries and their respective currencies.
- Real-time currency conversion: Input the desired amount to be converted and instantly view the converted value using live exchange rates.
- Wide currency coverage: Support for a comprehensive range of currencies from various countries.



## Technologies, Libraries, APIs
This project is implemented with the following technologies:

- ```d3``` to create and render an interactive world map.
- ```API``` calls to an external web service to get rates and do the conversion.
- ```Webpack``` and ```Babel``` to bundle and transpile the source JavaScript code.
- ```npm``` to manage project dependencies.


A globe is drawed onto a page using ```Canvas``` and ```d3``` library. The data, which includes countries' coordinates and their currencies, is stored in a special GeoJSON formatted file which is used for creating a projection. After applying some modifiers the projection is used for producing canvas image. Each frame is rendered using ```requestAnimationFrame```.
```JavaScript
    // clear canvas, tooltip, and reset cursor
    ctx.clearRect(0, 0, width, height);
    handleTooltip.hide(tooltip);
    this.canvas.style.cursor = 'move';

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

      /*
        some interactivity logic here...
      */

      geoGenerator(d);

      ctx.stroke();
      ctx.fill();
    }

    window.requestAnimationFrame(this.update);

```

The globe model has some spinning effects. Spinning speed and timing are controlled through instance variables and timeouts.

```JavaScript
static spin(item) {
    if (item.animation.spinTimeoutId) {
      clearTimeout(item.animation.spinTimeoutId);
    }
    
    item.animation.rotationSpeed = MAP_CONSTANTS.fastRotationSpeed;

    item.animation.spinTimeoutId = setTimeout(() => {
      item.animation.rotationSpeed = MAP_CONSTANTS.defaultRotationSpeed;
    }, 1075);
  }
```

In order to do currency conversion with live rates, API calls to a web service are made.


## Implementation Timeline
- **Thursday**: Setup project, including getting webpack up and running, and configuring linter. Spend time reading the documentation for d3-geo and getting familiar with it.
- **Friday & Weekend**: Render the actual world map and make it interactive (hover and clicks).
- **Monday**: Add inputs and selectors and put an api server in use for conversion.
- **Tuesday**: Connect inputs and the map and make them work together for currency conversion.
- **Wednesday**: Finish implementing user controls, and focus on styling, as well as implementing nav links and an instructions modal.
- **Thursday**: Deploy to GitHub pages. Write a production README.


## Bonus features
Some anticipated updates are:

- Add more detailed info for chosen currencies.
- Design the UI to follow Google's Material system. 

