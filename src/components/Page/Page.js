import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./Page.css";

export default class LandingPage extends Component {
  render() {
    return (
      <Container fluid className="landing-root">
        <Row>
          <Col>
            <h1>{this.props.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="landing-text">
              {this.props.text}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
