import React, { Component } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import BarChart from "./components/BarChart/BarChart";
import StreamGraph from "./components/StreamGraph/StreamGraph";
import Brush from "./components/Brush/Brush";
import StatLine from "./components/StatLine/StatLine";
import worlddata from "./data/world";
import { range } from "d3-array";
import { scaleThreshold } from "d3-scale";
import { geoCentroid } from "d3-geo";
import "./App.css";

const appdata = worlddata.features;

appdata.forEach((d, i) => {
  const offset = Math.random();
  d.launchday = i;
  d.data = range(30).map((p, q) => (q < i ? 0 : Math.random() * 2 + offset));
});

const colorScale = scaleThreshold()
  .domain([5, 10, 20, 30])
  .range(["#ffe6e6", "#ff6666", "#e60000", "#990000"]);

export default class App extends Component {
  state = {
    screenWidth: 1920,
    screenHeight: 1080,
    hover: "none",
    brushExtent: [0, 40]
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  }

  onResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight - 120
    });
  };

  onHover = d => {
    this.setState({ hover: d.id });
  };

  onHoverOut = () => {
    this.setState({ hover: -1});
  }

  onBrush = d => {
    this.setState({ brushExtent: d });
  };

  render() {
    const filteredAppdata = appdata.filter(
      (d, i) =>
        d.launchday >= this.state.brushExtent[0] &&
        d.launchday <= this.state.brushExtent[1]
    );
    return (
      <div className="App">
        <div className="App-header">
          <h2>d3ia dashboard</h2>
        </div>
        <div>
          <StatLine allData={appdata} filteredData={filteredAppdata} />
          <StreamGraph
            hoverElement={this.state.hover}
            onHover={this.onHover}
            onHoverOut={this.onHoverOut}
            colorScale={colorScale}
            data={filteredAppdata}
            size={[this.state.screenWidth, this.state.screenHeight / 2]}
          />
          <Brush
            changeBrush={this.onBrush}
            size={[this.state.screenWidth, 50]}
          />
          <WorldMap
            hoverElement={this.state.hover}
            onHover={this.onHover}
            onHoverOut={this.onHoverOut}
            colorScale={colorScale}
            data={filteredAppdata}
            size={[this.state.screenWidth, this.state.screenHeight / 2]}
          />
          <BarChart
            hoverElement={this.state.hover}
            onHover={this.onHover}
            onHoverOut={this.onHoverOut}
            colorScale={colorScale}
            data={filteredAppdata}
            size={[this.state.screenWidth, this.state.screenHeight / 2]}
          />
        </div>
      </div>
    );
  }
}
