import React, { Component } from "react";
import USAMap from "react-usa-map";
import stateCodes from "../../data/states_hash.json";
import "./USMap.css";

export default class USMap extends Component {
  state = {
    years: [],
    currentYear: "",
    config: {}
  };

  constructor(props) {
    super(props);
    const { data } = props;

    /*
      - Filter out empty numCustomersAffected data
      - We need to sum numCustomersAffected for each state
    */
    let filteredData = data.filter(d => {
      return d.numCustomersAffected !== "";
    });

    /*
      - Get the unique list of years, so that we can display one year at a time
    */
    let years = [];
    filteredData.forEach(item => {
      let i = years.findIndex(x => x.year === item.year);
      if (i <= -1) {
        years.push(item.year);
      }
    });

    /*
      - Let JS Set notation parse the array into unique values
    */
    years = [...new Set(years)];

    /*
      - Set up the config object to have keys of state codes
      - Add name key of state for pattern matching the data
    */
    let config = {};
    for (let key in stateCodes) {
      if (stateCodes.hasOwnProperty(key)) {
        // console.log(key + " -> " + stateCodes[key]);
        config[key] = {
          name: stateCodes[key]
        };
      }
    }

    console.log(config);
  }

  mapHandler = event => {
    alert(event.target.dataset.name);
  };

  statesCustomConfig = () => {
    return {
      NJ: {
        fill: "navy",
        clickHandler: event =>
          console.log("Custom handler for NJ", event.target.dataset)
      },
      NY: {
        fill: "#CC0000"
      }
    };
  };

  render() {
    return (
      <div className="App">
        <USAMap
          onClick={this.mapHandler}
          onHover={this.hover}
          customize={this.statesCustomConfig()}
          width={this.props.screenSize[0]}
          height={this.props.screenSize[1]}
          title="United States Map"
        />
      </div>
    );
  }
}
