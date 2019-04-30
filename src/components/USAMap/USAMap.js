import React, { Component } from "react";

export default class USAMap extends Component {
  mapHandler = event => {
    alert(event.target.dataset.name);
  };
  render() {
    return <USAMap onClick={this.mapHandler} />;
  }
}
