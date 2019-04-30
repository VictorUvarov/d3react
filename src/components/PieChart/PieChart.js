import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import colors from "../../data/colors";
import DropDownButton from "./../DropDownButton/DropDownButton";

export default class PieChart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    title: "Title"
  };

  constructor(props) {
    super(props);
    // remove rows in the data with no customer affected amount
    let filteredData = props.data.filter(d => {
      return d.numCustomersAffected !== "";
    });
    // get the unique list of years
    let years = [];
    filteredData.forEach(item => {
      let i = years.findIndex(x => x.year === item.year);
      if (i <= -1) {
        years.push(item.year);
      }
    });
    years = [...new Set(years)];

    this.state = {
      data: filteredData,
      year: props.data[0].year,
      years: years,
      screenWidth: props.screenSize[0],
      screenHeight: props.screenSize[1]
    };
  }

  updateYear = year => {
    this.setState({ year: year });
  };

  render() {
    const { data } = this.state;

    // filter data based on current year
    let filteredData = data.filter(d => {
      return d.year === this.state.year;
    });

    // remove duplicate descriptions, since pie chart categories are descriptions
    let unique = [];
    filteredData.forEach(item => {
      let i = unique.findIndex(x => x.description === item.description);
      if (i <= -1) {
        unique.push({
          year: item.year,
          description: item.description,
          numCustomersAffected: item.numCustomersAffected
        });
      }
    });

    // since chart.js needs a special format for chart data
    // split the unique data so that it can be added to chart data
    let labels = [];
    let values = [];
    unique.forEach(d => {
      labels.push(d.description);
      values.push(parseInt(d.numCustomersAffected));
    });

    // chart.js data format
    let chartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors
        }
      ]
    };

    if (data === null) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <DropDownButton
          header="Select a Year"
          years={this.state.years}
          updateYear={this.updateYear}
        />
        <Pie
          data={chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title + " (" + this.state.year + ")",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            layout: {
              padding: {
                left: 0,
                right: 50,
                bottom: 50,
                top: 0
              }
            }
          }}
        />
      </div>
    );
  }
}
