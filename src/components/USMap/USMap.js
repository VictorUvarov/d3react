import React, { Component } from "react";
import USAMap from "react-usa-map";
import stateCodes from "../../data/states_hash.json";
import { scaleLinear } from "d3-scale";
import "./USMap.css";

export default class USMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentYear: props.data[0].year,
      title: "United States Map"
    }
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
      if(isNum)
        return d[key] !== "" || +d[key] !== 0;
      else
        return d[key] !== "";
    });
    return filteredList;
  }

  render() {
    const { data } = this.props;

    /*
      - Filter out empty numCustomersAffected data
      - We need to sum numCustomersAffected for each state
    */
    let filteredData = this.filterObjectList(data, "numCustomersAffected", true);

    /*
      - Set up the config object to have keys of state codes
      - Add name key of state for pattern matching the data
    */
    let config = {};
    for (let key in stateCodes) {
      if (stateCodes.hasOwnProperty(key)) {
        config[key] = {
          name: stateCodes[key]
        };
      }
    }

    /*
      - Find max and min for numberOfCustomersAffected
    */
    let listNums = [];
    filteredData.forEach(d => {
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
    filteredData.forEach(d => {
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
