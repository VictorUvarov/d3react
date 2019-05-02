import React, { Component } from "react";
//import * as d3 from "d3";
import { ForceGraph, ForceGraphNode } from "react-vis-force";

export default class Blob extends Component {
  constructor(props) {
    super(props);
    //var size = props.data.length / 5;
    this.state = {
      data: props.data,
      counter: 0,
      /*nodes: d3.range(size).map(function(d) {
        return { radius: 5 };
      }),*/
      nodes: [],
      width: this.props.size[0],
      height: this.props.size[1],
      /*simulation: null,
      xInitCircle: [],
      yInitCircle: [],*/
    };
  }

  componentDidMount() {
    for(; this.state.counter < this.state.data.length / 10; this.state.counter++) {
      this.state.nodes.push(
        <ForceGraphNode node={{ id: this.state.counter }} fill="black" />
      );
    }
    // var ticked = () => {
    //   const u = d3
    //     .select("svg")
    //     .selectAll("circle")
    //     .data(this.state.nodes);

    //   u.enter()
    //     .append("circle")
    //     .attr("r", function(d) {
    //       return d.radius;
    //     })
    //     .merge(u)
    //     .attr("cx", function(d) {
    //       return d.x;
    //     })
    //     .attr("cy", function(d) {
    //       return d.y;
    //     });

    //   u.exit().remove();
    // };
    // this.state.simulation = d3
    //   .forceSimulation(this.state.nodes)
    //   .force("charge", d3.forceManyBody().strength(0.25))
    //   .force(
    //     "center",
    //     d3.forceCenter(this.state.width / 2, this.state.height / 2)
    //   )
    //   .force(
    //     "collision",
    //     d3.forceCollide().radius(function(d) {
    //       return d.radius;
    //     })
    //   )
    //   .on("tick", ticked);
    
  }

  render() {
    // return (
    // <svg width={this.state.width} height={this.state.height}></svg>
    // );
    return (
      <ForceGraph simulationOptions={{ height: this.state.height, 
        width: this.state.width,
        animate: true }}>
        {this.state.nodes}
      </ForceGraph>
    );
  }
}
