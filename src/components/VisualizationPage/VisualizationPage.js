import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import "./VisualizationPage.css";

export default class VisualizationPage extends Component {
    render() {
        return (
            <Container fluid className="vis-root">
            <Row>
              <Col>
                <h1>{this.props.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="vis-text">
                  {this.props.text}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.props.visualization}
              </Col>
            </Row>
          </Container>
        );
    }
}
