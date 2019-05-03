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

    this.state = {
      currentYear: props.data[0].year,
      title: "United States Map",
      data: filteredData,
      config: config
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

  render() {
    const { data, config } = this.state;

    /*
      - Find max and min for numberOfCustomersAffected
    */
    let listNums = [];
    data.forEach(d => {
      const num = +d.numCustomersAffected;
      listNums.push(num);
    });
    let maxNum = Math.max(...listNums) / 10;
    let minNum = Math.min(...listNums);

    /*
      - Create the color scale
    */
    const colorStart = "#d3d3d3";
    const colorEnd = "#ff0000";
    const colorScale = scaleLinear()
      .domain([minNum, maxNum])
      .range([colorStart, colorEnd]);

    /*
      For each data element in power outage data
      match the config name with the power outage geographic area
      e.g. config.name ="Alaska"  filteredData.geographicAreas = "Alaska"
      if they match add the color to the config so the map can color that state
    */
    data.forEach(d => {
      for (const key in config) {
        if (config.hasOwnProperty(key)) {
          const element = config[key];
          if (d.geographicAreas.includes(element.name)) {
            const num = +d.numCustomersAffected;
            config[key]["fill"] = colorScale(num);
          }
        }
      }
    });

    return (
      <USAMap
        onClick={this.mapHandler}
        customize={config}
        width={this.props.screenSize[0]}
        height={this.props.screenSize[1] - 100}
        title="United States Map"
      />
    );
  }
}
