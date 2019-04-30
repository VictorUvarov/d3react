import React, { Component } from "react";
import "./Page.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-root">
        <h1>{this.props.title}</h1>
        <p className="landing-text">{this.props.text}</p>
      </div>
    );
  }
}
