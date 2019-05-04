import React, { Component } from "react";
import ArrowButton from "../ArrowButton/ArrowButton";
import "./Page.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-root" id={this.props.id}>
        <h1>{this.props.title}</h1>
        <p className="landing-text">{this.props.text}</p>
        <ArrowButton jumpTarget={this.props.jumpTarget} />
      </div>
    );
  }
}
