import React, { Component } from "react";
import VisualizationPage from "./components/VisualizationPage/VisualizationPage";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import PieChart from "./components/PieChart/PieChart";
import Blob from "./components/Blob/Blob";
import Page from "./components/Page/Page";
import powerData from "./data/power_outages.csv";
import { csv } from "d3-request";
import LineChart from "./components/LineChart/LineChart";
import BarChart from "./components/BarChart/BarChart";
import "./utils/scroll";
import USAMap from "./components/USMap/USAMap";

export default class App extends Component {
  state = {
    screenWidth: 1920,
    screenHeight: 1080,
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

  render() {
    const { data, screenWidth, screenHeight } = this.state;

    if (data === null) {
      return <div>loading...</div>;
    }
    return (
      <div className="App">
        <div>
          <Page
            id="home-page"
            jumpTarget="#question-page-1"
            title="Power Outages in the United States"
            text="We currently live in a time where electronics become
            more and more integral in our daily lives. As a result, the 
            demand for power increases and events like power outages are 
            becoming more and more concerning. Power outages 
            in the United States occur for many reasons. Analysis of the 
            causes, frequency, and the impact of power outages follows..."
          />
          <QuestionPage
            id="question-page-1"
            jumpTarget="#vis-page-1"
            title="What Causes Outages?"
            text="The simulation below shows the causes of power outages and their 
            relative frequency to one another in the United States from 
            2000-2014. From the simulation we learned that severe 
            weather conditions cause the most power outages."
          />
          <VisualizationPage
            id="vis-page-1"
            jumpTarget="#question-page-2"
            title="Each Node Represents About 10 Power Outages"
            visualization={
              <Blob data={data} screenSize={[screenWidth, screenHeight]} />
            }
          />
          <QuestionPage
            id="question-page-2"
            jumpTarget="#vis-page-2"
            title="What are the Most Common Causes?"
            text="To answer this question we used an interactive pie chart 
            that filters the data based on year. Based on that year you can
            see what the most common causes on power outages in the United 
            States."
          />
          <VisualizationPage
            id="vis-page-2"
            jumpTarget="#question-page-3"
            visualization={
              <PieChart
                data={data}
                title="Power Outage Causes and Number of Customer Affected"
                screenSize={[screenWidth, screenHeight]}
              />
            }
          />
          <QuestionPage
            id="question-page-3"
            jumpTarget="#vis-page-3"
            title="Where is it More Common?"
            text="To answer this question we used a chloropleth map to show
            which states experience power outages more frequently.
            The darker the color of the state the more people were affected."
          />
          <VisualizationPage
            id="vis-page-3"
            jumpTarget="#question-page-4"
            visualization={
              <div>
                <h2 style={{ marginBottom: "-50px" }}>Number of Affected Customers per State</h2>
                <USAMap data={data} width={screenWidth} height={screenHeight} />
              </div>
            }
          />
          <QuestionPage
            id="question-page-4"
            jumpTarget="#vis-page-4"
            title="When is it More Impactful?"
            text="Looking at the bar graph below we can conclude that the most common hours
            of the day when people experience power outages are between 3:00pm - 6:00pm"
          />
          <VisualizationPage
            id="vis-page-4"
            jumpTarget="#question-page-5"
            visualization={
              <BarChart
                data={data}
                title="Number of People Affected for Every Hour"
              />
            }
          />
          <QuestionPage
            id="question-page-5"
            jumpTarget="#vis-page-5"
            title="When is it More Impactful?"
            text="By looking at the line graph below we can answer when power outages are more impactful based on year.
            The years 2008, 2011, and 2012 had the highest incidences of power outages in the last 15 years of our data set range."
          />
          <VisualizationPage
            id="vis-page-5"
            jumpTarget="#conclusion-page"
            visualization={
              <LineChart
                data={data}
                title="Number of People Affected Over Time"
              />
            }
          />
          <Page
            id="conclusion-page"
            jumpTarget="#home-page"
            title="Conclusion"
            text="Through the use of both static and interactive visualizations 
            we were able to take a data set that truly intrested us and explored 
            the different ways to represent the answers we found. Some key 
            insights we found from the data set include; that roughly half of 
            the power outages in the last fifteen years have been caused by 
            severe weather conditions, that people in 2014 who experienced 
            power outages mainly had been caused by system failures, and 
            that New Mexico, Oklahoma, and Kansas experience power outages
            more frequently than the rest of the United States."
          />
        </div>
      </div>
    );
  }
}
