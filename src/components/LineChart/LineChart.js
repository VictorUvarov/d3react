import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineChart extends Component {
  state = {
    years: [],
    sums: []
  }
  componentDidMount() {
    // create a list of all the years
    let years = [];
    this.props.data.forEach(item => {
      let i = years.findIndex(x => x.description === item.description);
      if (i <= -1) {
        years.push(item.year);
      }
    });
    // turn the list of years into a set of years
    years = [...new Set(years)];
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
      sumList.push(d.sum);
    });

    this.setState({
      years: yearList,
      sums: sumList
    });
  }

  render() {
    return (
      <div>
        <Line
          data={
            {
              labels: this.state.years,
              datasets: [
                {
                  label: "",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.state.sums
                }
              ]
            }            
          }
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
                    fontSize: 25
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Number of customers affected",
                    fontSize: 25
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
