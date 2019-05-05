import React, { Component } from "react";
import "./QuestionPage.css";

export default class QuestionPage extends Component {
  render() {
    return (
      <div className="question-root" id={this.props.id}>
        <h1>{this.props.title}</h1>
        <p className="question-text">{this.props.text}</p>        
      </div>
    );
  }
}
