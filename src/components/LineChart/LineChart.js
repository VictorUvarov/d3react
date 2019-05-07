import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Utils from "../../utils/Utils";

export default class LineChart extends Component {
  state = {
    years: [],
    sums: []
  };

  componentDidMount() {
    // create a list of all the years
    let years = Utils.getUniqueListFromKey(this.props.data, "year");
    years.reverse();

    // create a list of objects for each year and their sum
    let sums = [];
    this.props.data.forEach(d => {
      let i = years.findIndex(x => x === d.year);
      if (sums[i] === undefined) {
        sums[i] = {
          year: years[i],
          sum: +d.numCustomersAffected
        };
      } else {
        sums[i].sum += +d.numCustomersAffected;
      }
    });

    let yearList = [];
    let sumList = [];
    sums.forEach(d => {
      yearList.push(d.year);
      sumList.push(d.sum / 1000000);
    });

    this.setState({
      years: yearList,
      sums: sumList
    });
  }

  render() {
    const color = "rgba(75,192,192,0.6)";
    const solidColor = "rgba(75,192,192,1)";
    return (
      <div>
        <Line
          data={{
            labels: this.state.years,
            datasets: [
              {
                label: "",
                fill: false,
                lineTension: 0.1,
                backgroundColor: color,
                borderColor: solidColor,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: solidColor,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: solidColor,
                pointHoverBorderColor: solidColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.sums
              }
            ]
          }}
          options={{
            legend: {
              display: false
            },
            title: {
              display: true,
              text: this.props.title,
              fontSize: 25
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Year",
                    fontSize: 20
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Number of customers affected (millions)",
                    fontSize: 20
                  },
                  gridLines: {
                    display: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
