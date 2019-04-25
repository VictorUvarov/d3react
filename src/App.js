import React, { Component } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import BarChart from "./components/BarChart/BarChart";
import StreamGraph from "./components/StreamGraph/StreamGraph";
import Brush from "./components/Brush/Brush";
// import StatLine from "./components/StatLine/StatLine";
// import ColorPicker from "./components/ColorPicker/ColorPicker";
import Blob from "./components/Blob/Blob";
import Page from "./components/Page/Page";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import VisualizationPage from "./components/VisualizationPage/VisualizationPage";
import worldData from "./data/world";
import powerData from "./data/power_outages.csv";
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
    colorScale: colorScale,
    data: []
  };

  async componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();

    csv(powerData, (error, data) => {
      if (error) throw error;
      this.updateData(data);
    });
  }

  updateData(data) {
    this.setState({ data: data });
  }

  onResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
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
    let data = this.state.data === null ? [] : this.state.data;
    return (
      <div className="App">
        <div>
          {/* <ul>
            {data.map(d => (
              <li key={d.id}>{d.description}</li>
            ))}
          </ul> */}
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
            title="What causes power outages?"
            text="visualization..."
            visualization={<Blob data={filteredAppdata} />}
          />
          <QuestionPage
            title="What are the most common causes?"
            text="description..."
          />
          <VisualizationPage
            title="What are the most common causes?"
            text="visualization..."
            visualization={
              <BarChart
                hoverElement={this.state.hover}
                onHover={this.onHover}
                onHoverOut={this.onHoverOut}
                colorScale={colorScale}
                data={filteredAppdata}
                size={[
                  this.state.screenWidth - 100,
                  this.state.screenHeight / 3
                ]}
              />
            }
          />
          <QuestionPage
            title="Where and when is it more common?"
            text="description..."
          />
          <VisualizationPage
            title="Where and when is it more common?"
            text="visualization..."
            visualization={
              <WorldMap
                hoverElement={this.state.hover}
                onHover={this.onHover}
                onHoverOut={this.onHoverOut}
                colorScale={colorScale}
                data={appdata}
                size={[
                  this.state.screenWidth - 100,
                  this.state.screenHeight / 3
                ]}
              />
            }
          />
          <QuestionPage
            title="When is it more impactful?"
            text="description..."
          />
          <VisualizationPage
            title="When is it more impactful?"
            text="visualization..."
            visualization={
              <div>
                <StreamGraph
                  hoverElement={this.state.hover}
                  onHover={this.onHover}
                  onHoverOut={this.onHoverOut}
                  colorScale={colorScale}
                  data={filteredAppdata}
                  size={[
                    this.state.screenWidth - 100,
                    this.state.screenHeight / 3
                  ]}
                />
                <Brush
                  changeBrush={this.onBrush}
                  size={[this.state.screenWidth - 100, 50]}
                />
              </div>
            }
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
        </div>
      </div>
    );
  }
}
