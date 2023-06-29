# Currency Converter

## Background
This currency converter project is a tool that enables users to convert currencies and visualize exchange rates. It allows users to select their desired currencies either from a dropdown menu or using an interactive world map. They can then input the amount to be converted, and instantly view the converted value. Additionally, users can explore historical exchange rate trends through an interactive rates graph, providing valuable insights into currency fluctuations over time.


## Functionality & MVPs
With this Currency Converter tool, users will be able to:
- Use interactive world map: Select currencies by clicking on countries and regions on the map.
- Use dropdown menus: Choose currencies from a list.
- Convert currency using real-time rates: Input the amount to be converted and instantly view the converted value.
- Inspect rates graph: Explore historical exchange rate trends through a graph.

In addition, this project will include:
- An About modal describing the background and providing instructions.
- A production README.


## Wireframes
<img width="600" alt="Screen Shot 2023-06-28 at 20 18 46" src="https://github.com/artemplv/currency-converter/assets/48654322/233c4ac0-abae-421c-9475-ab80044a4fd0">


## Technologies, Libraries, APIs
This project will be implemented with the following technologies:

- ```d3-geo``` to create and render an interactive world map.
- ```d3``` to create and present graphs.
- ```API``` calls to an external web service to get rates and do the conversion.
- ```Webpack``` and ```Babel``` to bundle and transpile the source JavaScript code.
- ```npm``` to manage project dependencies.


## Implementation Timeline
- **Thursday**: Setup project, including getting webpack up and running. Spend time reading the documentation for d3-geo and getting familiar with it.
- **Friday & Weekend**: Render the actual world map and make it interactive (hover and clicks).
- **Monday**: Add inputs and selectors and put an api server in use for conversion.
- **Tuesday**: Connect inputs and the map and make them work together for currency conversion. If time, implement currencies rates graph.
- **Wednesday**: Finish implementing user controls, and focus on styling, as well as implementing nav links and an instructions modal. If time, start on bonuses.
- **Thursday**: Deploy to GitHub pages. If time, rewrite this proposal as a production README.


## Bonus features
Some anticipated updates are:

- Add more detailed info for chosen currencies.
- Design the UI to follow Google's Material system. 

