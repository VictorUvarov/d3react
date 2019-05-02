import React, { Component } from "react";
import { ForceGraph, ForceGraphNode } from "react-vis-force";
import DropDownMenu from "./../DropDownMenu/DropDownMenu";

export default class Blob extends Component {
  constructor(props) {
    super(props);
    let filteredData = props.data.filter(d => {
      return d;
    });
    let causes = []

    filteredData.forEach(item => {
      let i = causes.findIndex(x => x.description === item.description);
      if (i <= -1) {
        causes.push(item.description);
      }
    });
    causes = [...new Set(causes)];

    this.state = {
      data: props.data,
      nodes: [],
      width: props.size[0],
      height: props.size[1],
      cause: causes[0],
      causes: causes,
      causeCount: 0,
    };
  }

  componentDidMount() {
    var nodes = [];
    let filteredData = this.state.data.filter(d => {
      return d.description === this.state.cause
    });
    var i = 0;
    for(; i < filteredData.length / 10; i++) {
      nodes.push(
        <ForceGraphNode node={{ id: i }} fill="red" />
      );
    }
    for(; i < this.state.data.length / 10; i++) {
      nodes.push(
        <ForceGraphNode node={{ id: i }} fill="black" />
      );
    }
    this.setState( 
      {causeCount : filteredData.length,
      nodes: nodes} );
  }

  updateCause = cause => {
    var nodes = [];
    let filteredData = this.state.data.filter(d => {
      return d.description === cause
    });
    var i = 0;
    for(; i < filteredData.length / 10; i++) {
      nodes.push(
        <ForceGraphNode node={{ id: i }} fill="red" />
      );
    }
    console.log(i);
    for(; i < this.state.data.length / 10; i++) {
      nodes.push(
        <ForceGraphNode node={{ id: i }} fill="black" />
      );
    }
    this.setState( 
      {cause: cause,
      causeCount : filteredData.length, 
      nodes: nodes} );
  }

  render() {
    console.log(this.state.cause);
    return (
      <div>
        <label> 
          {this.state.causeCount} out of {this.state.data.length} outages due to {this.state.cause} in the last 15 years.
        </label>
        <DropDownMenu
          header="Select a cause"
          causes={this.state.causes}
          updateCause={this.updateCause}
        />
        <ForceGraph simulationOptions={{ height: this.state.height, 
          width: this.state.width,
          animate: true }}>
          {this.state.nodes}
        </ForceGraph>
      </div>
    );
  }
}
