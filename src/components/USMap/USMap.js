import React, { Component } from "react";
import USAMap from "react-usa-map";
import stateCodes from "../../data/states_hash.json";
import Utils from "../../utils/Utils";
import { scaleLinear } from "d3";
import "./USMap.css";

export default class USMap extends Component {
  constructor(props) {
    super(props);

    let filteredData = Utils.filterObjectList(
      props.data,
      "numCustomersAffected",
      true
    );

    let config = this.initConfig();

    let affectedAmounts = Utils.getListFromListOfObjects(
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

    config = Utils.addKeyToObjectFromMatchingListKey(
      filteredData,
      config,
      colorScale,
      {
        matchingKeyInList: "geographicAreas",
        matchingKeyInObject: "name",
        valueKey: "numCustomersAffected",
        keyToAdd: "fill"
      }
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

  mapHandler = event => {
    this.setState({ title: event.target.dataset.name });
  };

  componentWillUpdate() {
    console.log(this.state.title);
  }

  statesCustomConfig = () => {
    return this.state.config;
  };

  render() {
    return (
      <USAMap
        onClick={this.mapHandler}
        customize={this.state.config}
        width={this.props.screenSize[0]}
        height={this.props.screenSize[1] - 250}
        title="United States Map"
      />
    );
  }
}
