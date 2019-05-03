import React, { Component } from "react";
import USAMap from "react-usa-map";
import stateCodes from "../../data/states_hash.json";
import { scaleLinear } from "d3-scale";
import "./USMap.css";

export default class USMap extends Component {
  constructor(props) {
    super(props);

    let filteredData = this.filterObjectList(
      props.data,
      "numCustomersAffected",
      true
    );

    let config = this.initConfig();

    let affectedAmounts = this.getListFromListOfObjects(
      filteredData,
      "numCustomersAffected",
      true
    );
    let max = Math.max(...affectedAmounts) / 10;
    let min = Math.min(...affectedAmounts);

    const colorStart = "#d3d3d3";
    const colorEnd = "#ff0000";
    const colorScale = scaleLinear()
      .domain([min, max])
      .range([colorStart, colorEnd]);

    config = this.addKeyToObjectFromMatchingListKey(
      filteredData,
      config,
      colorScale
    );

    this.state = {
      currentYear: props.data[0].year,
      title: "United States Map",
      data: filteredData,
      config: config,
      max: max,
      min: min,
      colorScale: colorScale
    };
  }

  mapHandler = event => {
    this.setState({ title: event.target.dataset.name });
    console.log(event.target.dataset.name);
  };

  statesCustomConfig = () => {
    return this.state.config;
  };

  filterObjectList = (list, key, isNum) => {
    let filteredList = list.filter(d => {
      if (isNum) return d[key] !== "" || +d[key] !== 0;
      else return d[key] !== "";
    });
    return filteredList;
  };

  initConfig = () => {
    let config = {};
    for (let key in stateCodes) {
      if (stateCodes.hasOwnProperty(key)) {
        config[key] = {
          name: stateCodes[key]
        };
      }
    }
    return config;
  };

  getListFromListOfObjects = (list, key, isKeyNum) => {
    let l = [];
    list.forEach(element => {
      isKeyNum === true ? l.push(+element[key]) : l.push(element[key]);
    });
    return l;
  };

  /*
    For each data element in power outage data
    match the config name with the power outage geographic area
    e.g. config.name ="Alaska"  filteredData.geographicAreas = "Alaska"
    if they match add the color to the config so the map can color that state
  */
  addKeyToObjectFromMatchingListKey = (list, object, valueFunction) => {
    const matchingKeyInList = "geographicAreas";
    const matchingKeyInObject = "name";
    const valueKey = "numCustomersAffected";
    const keyToAdd = "fill";

    list.forEach(d => {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          if (d[matchingKeyInList].includes(element[matchingKeyInObject])) {
            const num = +d[valueKey];
            object[key][keyToAdd] = valueFunction(num);
          }
        }
      }
    });

    return object;
  };

  render() {
    return (
      <USAMap
        onClick={this.mapHandler}
        customize={this.state.config}
        width={this.props.screenSize[0]}
        height={this.props.screenSize[1] - 100}
        title="United States Map"
      />
    );
  }
}
