import React, { Component } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import BarChart from "./components/BarChart/BarChart";
import StreamGraph from "./components/StreamGraph/StreamGraph";
import Brush from "./components/Brush/Brush";
import StatLine from "./components/StatLine/StatLine";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import worldData from "./data/world";
import olympicData from "./data/olympics.csv";
import { range } from "d3-array";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-request";
import "./App.css";

const appdata = worldData.features;

appdata.forEach((d, i) => {
  const offset = Math.random();
  d.launchday = i;
  d.data = range(30).map((p, q) => (q < i ? 0 : Math.random() * 2 + offset));
});

let colors = ["#e6f0ff", "#80b3ff", "#1a75ff", "#003d99"];
let thresholds = [5, 10, 20, 30];

const colorScale = scaleLinear()
  .domain(thresholds)
  .range(colors);

export default class App extends Component {
  state = {
    screenWidth: 1920,
    screenHeight: 1080,
    hover: "none",
    brushExtent: [0, 35],
    currentColor: "blue",
    colorScale: colorScale
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
    csv(olympicData, (error, data) => {
      if (error) throw error;
      // console.log(data);
    });
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
    this.setState({ hover: -1 });
  };

  onBrush = d => {
    this.setState({ brushExtent: d });
  };

  handleColor = color => {
    let newScale = this.state.colorScale.range(["white", color.hex]);
    this.setState({ currentColor: color.hex, colorScale: newScale });
  };

  render() {
    const filteredAppdata = appdata.filter(
      (d, i) =>
        d.launchday >= this.state.brushExtent[0] &&
        d.launchday <= this.state.brushExtent[1]
    );
    return (
      <div className="App">
        <div>
          <ColorPicker
            color={this.state.currentColor}
            handleColor={this.handleColor}
          />
          <StatLine allData={appdata} filteredData={filteredAppdata} />
          <StreamGraph
            hoverElement={this.state.hover}
            onHover={this.onHover}
            onHoverOut={this.onHoverOut}
            colorScale={colorScale}
            data={filteredAppdata}
            size={[this.state.screenWidth, this.state.screenHeight / 3]}
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
            size={[this.state.screenWidth, this.state.screenHeight / 3]}
          />
          <BarChart
            hoverElement={this.state.hover}
            onHover={this.onHover}
            onHoverOut={this.onHoverOut}
            colorScale={colorScale}
            data={filteredAppdata}
            size={[this.state.screenWidth, this.state.screenHeight / 3]}
          />
        </div>
      </div>
    );
  }
}
