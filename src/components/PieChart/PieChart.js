import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import Utils from "../../utils/Utils";
import Buttons from "../Buttons/Buttons";

export default class PieChart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    title: "Title"
  };

  constructor(props) {
    super(props);

    let filteredData = Utils.filterObjectList(
      props.data,
      "numCustomersAffected",
      true
    );

    let years = Utils.getUniqueListFromKey(filteredData, "year");

    this.state = {
      data: filteredData,
      year: props.data[0].year,
      years: years,
      screenWidth: props.screenSize[0],
      screenHeight: props.screenSize[1]
    };
  }

  creatChartConfig(labels, values, colors) {
    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors
        }
      ]
    };
  }

  formatChartData(unique) {
    let labels = [];
    let values = [];
    let colors = [];
    unique.forEach(d => {
      labels.push(d.description);
      values.push(parseInt(d.numCustomersAffected));
      colors.push(Utils.getRandomColor());
    });
    return { labels, values, colors };
  }

  getChartOptions() {
    return {
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
    };
  }

  removeDuplicates(filteredData) {
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
    return unique;
  }

  updateYear = year => {
    this.setState({ year: year });
  };

  render() {
    const { data, years } = this.state;

    // filter data based on current year
    let filteredData = data.filter(d => {
      return d.year === this.state.year;
    });

    // remove duplicate descriptions, since pie chart categories are descriptions
    let unique = this.removeDuplicates(filteredData);

    // since chart.js needs a special format for chart data
    // split the unique data so that it can be added to chart data
    let { labels, values, colors } = this.formatChartData(unique);

    // chart.js data format
    let chartData = this.creatChartConfig(labels, values, colors);

    return (
      <div>
        <Buttons onClick={this.updateYear} values={years} />
        <Pie data={chartData} options={this.getChartOptions()} />
      </div>
    );
  }
}
