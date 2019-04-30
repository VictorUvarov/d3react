import React, { Component } from "react";
import Blob from "./components/Blob/Blob";
import Page from "./components/Page/Page";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import VisualizationPage from "./components/VisualizationPage/VisualizationPage";
import CustomBarChart from "./components/CustomBarChart/CustomBarChart";
import powerData from "./data/power_outages.csv";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-request";
import USAMap from "react-usa-map";

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
    data: null
  };

  async componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();

    csv(powerData, (error, data) => {
      if (error) throw error;
      this.setState({ data: data });
    });
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
    const { data } = this.state;

    if (data === null) {
      return <div>loading...</div>;
    }
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
            title="What causes power outages?"
            text="visualization..."
            visualization={<Blob data={data} />}
          />
          <QuestionPage
            title="What are the most common causes?"
            text="description..."
          />
          <VisualizationPage
            title="What are the most common causes?"
            text="visualization..."
            visualization={
              <CustomBarChart />
              // <BarChart
              //   hoverElement={this.state.hover}
              //   onHover={this.onHover}
              //   onHoverOut={this.onHoverOut}
              //   colorScale={colorScale}
              //   data={filteredAppdata}
              //   size={[
              //     this.state.screenWidth - 100,
              //     this.state.screenHeight / 3
              //   ]}
              // />
            }
          />
          <QuestionPage
            title="Where and when is it more common?"
            text="description..."
          />
          <VisualizationPage
            title="Where and when is it more common?"
            text="visualization..."
            visualization={<USAMap onClick={this.mapHandler} />}
          />
          <QuestionPage
            title="When is it more impactful?"
            text="description..."
          />
          <VisualizationPage
            title="When is it more impactful?"
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
        </div>
      </div>
    );
  }
}
