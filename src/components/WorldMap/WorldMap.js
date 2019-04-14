import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";

export default class WorldMap extends Component {
  render() {
    const projection = geoMercator()
      .scale(100)
      .translate([this.props.size[0] / 2, this.props.size[1] / 2]);
    const pathGenerator = geoPath().projection(projection);
    const countries = this.props.data.map((d, i) => (
      <path
        key={"path" + i}
        d={pathGenerator(d)}
        onMouseEnter={() => {
          this.props.onHover(d);
        }}
        onMouseOut = {() => {
          this.props.onHoverOut();
        }}
        style={{
          fill:
            this.props.hoverElement === d.id
              ? "#FCBC34"
              : this.props.colorScale(d.launchday),
          stroke: "black",
          strokeOpacity: 0.5
        }}
        className="countries"
      />
    ));
    return (
      <svg width={this.props.size[0]} height={this.props.size[1]}>
        {countries}
      </svg>
    );
  }
}
