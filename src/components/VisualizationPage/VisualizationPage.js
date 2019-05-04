import React, { Component } from "react";
import "./VisualizationPage.css";

export default class VisualizationPage extends Component {
  render() {
    return (
      <div className="vis-root">
        <h1 className="vis-title">{this.props.title}</h1>
        <p className="vis-text">{this.props.text}</p>
        {this.props.visualization}
      </div>
    );
  }
}
