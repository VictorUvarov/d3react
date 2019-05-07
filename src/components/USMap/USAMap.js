import React, { Component } from "react";
import mapData from "../../data/states.json";
import { feature } from "topojson";
import * as d3 from "d3";
import "./USAMap.css";

export default class USAMap extends Component {
  componentDidMount() {
    console.log(this.props.data);
    this.drawMap();
  }

  componentDidUpdate() {
    this.drawMap();
  }

  drawMap() {
    const path = d3.geoPath();
    const states = feature(mapData, mapData.objects.states).features;
    const svg = d3.select("svg");

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
      .attr("fill", "#e3e3e3")
      .attr("stroke", "#fff")
      .attr("strokeWidth", 0.5)
      .on("mouseover", function(data) {
        const stateName = data.properties.name;
        d3.select(this).attr("fill", "#FCBC34");
        div
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        div
          .text(stateName)
          .style("left", d3.event.pageX + 15 + "px")
          .style("top", d3.event.pageY + 15 + "px");
      })
      .on("mouseout", function(data) {
        d3.select(this).attr("fill", "#e3e3e3");
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  render() {
    const { width, height } = this.props;
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 960 600"
        style={{ width: "100%", height: "auto" }}
      />
    );
  }
}
