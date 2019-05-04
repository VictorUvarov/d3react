import React, { Component } from "react";
import downArrow from "../../assets/down-arrow.png";
import jump from "jump.js";
import "./ArrowButton.css";

export default class ArrowButton extends Component {
  handleClick = target => {
    jump(target);
  };

  render() {
    return (
      <button
        className="arrow-button"
        onClick={() => this.handleClick(this.props.jumpTarget)}
      >
        <img src={downArrow} alt="Down Arrow"/>
      </button>
    );
  }
}
