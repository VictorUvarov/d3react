import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Utils from "../../utils/Utils";

export default class BarChart extends Component {
  state = {
    times: [],
    sums: []
  };

  componentDidMount() {
    const { data } = this.props;

    let key = "beginTime";
    let filteredData = Utils.filterObjectList(data, key, false);
    filteredData.forEach(d => {
      d[key] = Utils.cleanTime(d[key]);
    });
    let beginTimes = Utils.getUniqueListFromKey(filteredData, key);

    // create a list of objects for each beginTime and their sum
    // e.g. {beginTime: "09:28:00", sum: 262000}
    let sums = [];
    let key2 = "numCustomersAffected";
    filteredData.forEach(d => {
      let i = beginTimes.findIndex(x => x === d[key]);
      if (sums[i] === undefined) {
        sums[i] = {
          beginTime: beginTimes[i],
          sum: +d[key2]
        };
      } else {
        sums[i].sum += +d[key2];
      }
    });

    // organize sums by time e.g. 1:00:00 < 12:00:00
    let timeList = [];
    let sumList = [];
    sums.forEach(d => {
      let containsColon = d.beginTime.substring(0, 2).includes(":");
      let time = containsColon
        ? d.beginTime.substring(0, 1)
        : d.beginTime.substring(0, 2);
      let i = parseInt(time);

      timeList[i] = this.convertMilitaryToStandard(d.beginTime);
      sumList[i] = d.sum / 1000000;
    });

    this.setState({
      times: timeList,
      sums: sumList
    });
  }

  convertMilitaryToStandard(time) {
    time = time.split(":"); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += seconds < 10 ? ":0" + seconds : ":" + seconds; // get seconds
    timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

    return timeValue;
  }

  render() {
    const color = "rgba(70, 130, 180, 0.6)";
    const solidColor = "rgba(70, 130, 180, 1)";
    return (
      <div>
        <Bar
          data={{
            labels: this.state.times,
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
                    labelString: "Time",
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
