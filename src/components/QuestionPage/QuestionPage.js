import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./QuestionPage.css";

export default class QuestionPage extends Component {
  render() {
    return (
      <Container fluid className="question-root">
        <Row>
          <Col>
            <h1>{this.props.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="question-text">
              {this.props.text}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
