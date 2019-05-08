import React, { Component } from "react";
import mapData from "../../data/states.json";
import { feature } from "topojson";
import Utils from "../../utils/Utils";
import stateHashes from "../../data/states_hash.json";
import { legendColor } from "d3-svg-legend";
import * as d3 from "d3";
import "./USAMap.css";

export default class USAMap extends Component {
  componentDidMount() {
    const { data } = this.props;

    let filteredData = Utils.filterObjectList(
      data,
      "numCustomersAffected",
      true
    );

    let affectedAmounts = Utils.getListFromListOfObjects(
      filteredData,
      "numCustomersAffected",
      true
    );

    let max = Math.max(...affectedAmounts) * 5;
    let min = Math.min(...affectedAmounts);

    let stateSumList = [];
    for (let key in stateHashes) {
      const state = { name: stateHashes[key], value: 0 };
      stateSumList.push(state);
    }

    filteredData.forEach(d => {
      const stateName = d.geographicAreas;
      const value = +d.numCustomersAffected;
      stateSumList.forEach(state => {
        if (stateName.includes(state.name)) {
          state.value += value;
        }
      });
    });

    const colorScale = this.getColorScale(min, max);

    this.drawMap(stateSumList, colorScale);
    this.drawLegend(max, min);
  }

  componentDidUpdate() {
    this.drawMap();
  }

  formatNumber(num) {
    return num
      .toString()
      .replace(/,/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getColorScale(min, max) {
    const colorStart = "#e3e3e3";
    const colorEnd = "#ff0000";
    const colorScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([colorStart, colorEnd]);
    return colorScale;
  }

  drawMap(stateSumList, colorScale) {
    const node = this.node;
    const path = d3.geoPath();
    const states = feature(mapData, mapData.objects.states).features;
    const svg = d3.select(node);

    // Append Div for tooltip to SVG
    const div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll(".state")
      .data(states)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", path)
      .attr("fill", function(data) {
        const stateName = data.properties.name;
        let value;
        stateSumList.forEach(d => {
          if (d.name.includes(stateName)) value = d.value;
        });
        return colorScale(value);
      })
      .attr("stroke", "#fff")
      .attr("strokeWidth", 0.5)
      .on("mouseover", function(data) {
        const stateName = data.properties.name;
        let value;
        stateSumList.forEach(d => {
          if (d.name.includes(stateName)) value = d.value;
        });

        d3.select(this).attr("opacity", "0.6");
        div
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        div
          .text(
            stateName +
              ": " +
              value
                .toString()
                .replace(/,/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          )
          .style("left", d3.event.pageX - 30 + "px")
          .style("top", d3.event.pageY + 15 + "px");
      })
      .on("mouseout", function(data) {
        d3.select(this).attr("opacity", "1");
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  drawLegend(max, min) {
    const startColor = "#e3e3e3";
    const endColor = "#ff0000";

    var linear = d3
      .scaleLinear()
      .domain([0, max / 1000000])
      .range([startColor, endColor]);

    var svg = d3.select(this.node);

    svg
      .append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(680,5)");

    var legendLinear = legendColor()
      .shapeWidth(35)
      .cells(10)
      .orient("horizontal")
      .scale(linear);

    svg.select(".legendLinear").call(legendLinear);
  }

  render() {
    const { width, height } = this.props;
    return (
      <svg
        ref={node => (this.node = node)}
        width={width}
        height={height}
        viewBox="0 0 960 600"
        style={{ width: "100%", height: "auto" }}
        className="USAMap"
      />
    );
  }
}
