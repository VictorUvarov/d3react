import React, { Component } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import BarChart from "./components/BarChart/BarChart";
import StreamGraph from "./components/StreamGraph/StreamGraph";
import Brush from "./components/Brush/Brush";
import StatLine from "./components/StatLine/StatLine";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import Page from "./components/Page/Page";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import VisualizationPage from "./components/VisualizationPage/VisualizationPage";
import worldData from "./data/world";
import olympicData from "./data/olympics.csv";
import { range } from "d3-array";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-request";

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
          <Page
            title="Power outages in the United States"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed consectetur ac lacus nec vulputate. Fusce felis mauris, 
            vehicula laoreet fermentum eu, congue a velit. Praesent maximus 
            mi est, in pharetra eros pellentesque id. Morbi placerat turpis 
            eu augue varius vestibulum. Phasellus ut odio sed dolor volutpat 
            semper quis a tellus. Vivamus lobortis tempus ipsum imperdiet 
            auctor. Aenean bibendum, magna sit amet tincidunt efficitur, 
            ante nulla accumsan risus, eu feugiat augue urna et ex. Sed nec 
            bibendum massa, sed volutpat ante. Nunc eu consequat augue. Morbi 
            fermentum iaculis lorem vitae egestas. Sed varius eu erat in iaculis."
          />
          <QuestionPage title="What causes outages?" text="description..." />
          <VisualizationPage
            title="what causes outages?"
            text="visualization..."
          />
          <QuestionPage
            title="What are the most common causes?"
            text="description..."
          />
          <VisualizationPage
            title="What are the most common causes?"
            text="visualization..."
          />
          <QuestionPage
            title="where and when is it more common?"
            text="description..."
          />
          <VisualizationPage
            title="where and when is it more common?"
            text="visualization..."
          />
          <QuestionPage
            title="when is it more impactful?"
            text="description..."
          />
          <VisualizationPage
            title="when is it more impactful?"
            text="visualization..."
          />
          <Page
            title="Conclusion"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed consectetur ac lacus nec vulputate. Fusce felis mauris, 
            vehicula laoreet fermentum eu, congue a velit. Praesent maximus 
            mi est, in pharetra eros pellentesque id. Morbi placerat turpis 
            eu augue varius vestibulum. Phasellus ut odio sed dolor volutpat 
            semper quis a tellus. Vivamus lobortis tempus ipsum imperdiet 
            auctor. Aenean bibendum, magna sit amet tincidunt efficitur, 
            ante nulla accumsan risus, eu feugiat augue urna et ex. Sed nec 
            bibendum massa, sed volutpat ante. Nunc eu consequat augue. Morbi 
            fermentum iaculis lorem vitae egestas. Sed varius eu erat in iaculis."
          />
          {/* <ColorPicker
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
          /> */}
        </div>
      </div>
    );
  }
}
