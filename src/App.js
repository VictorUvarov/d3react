import React, { Component } from "react";

import VisualizationPage from "./components/VisualizationPage/VisualizationPage";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import BarChart from "./components/BarChart/BarChart";
// import Blob from "./components/Blob/Blob";
import Page from "./components/Page/Page";
import powerData from "./data/power_outages.csv";
import { csv } from "d3-request";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      screenWidth: 1920,
      screenHeight: 1080,
      data: null
    };
  }

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
            text="visualization... blob"
            // visualization={<Blob data={data} />}
            visualization={<div />}
          />
          <QuestionPage
            title="What are the most common causes?"
            text="description..."
          />
          <VisualizationPage
            title="What are the most common causes?"
            text="visualization... bar chart"
            visualization={<BarChart data={data} title="Power Outage Causes"/>}
          />
          <QuestionPage
            title="Where and when is it more common?"
            text="description..."
          />
          <VisualizationPage
            title="Where and when is it more common?"
            text="visualization... us map"
            visualization={<div />}
          />
          <QuestionPage
            title="When is it more impactful?"
            text="description..."
          />
          <VisualizationPage
            title="When is it more impactful?"
            text="visualization... bubble chart"
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
