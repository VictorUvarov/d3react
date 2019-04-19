import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <Container fluid className="landing-root">
        <Row>
          <Col>
            <h1>Power Outages in the United States</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="landing-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              risus lorem, tincidunt ac convallis vitae, hendrerit at elit.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Praesent porta nunc at lorem
              cursus, vitae facilisis nunc porttitor. Vestibulum sed arcu
              luctus, egestas mi a, ullamcorper nulla. Cras in nisl interdum
              ligula semper semper nec non ligula. Phasellus eu dolor non nisl
              sollicitudin viverra quis eget diam. Aenean sit amet est
              hendrerit, interdum elit vitae, dictum massa. Curabitur eu
              consequat orci, consequat ornare lectus. Curabitur vel volutpat
              lacus, id vestibulum ante. In quis risus vitae neque bibendum
              bibendum id et velit. Sed et ullamcorper risus. Nullam neque orci,
              suscipit at ipsum non, elementum ornare quam. Duis hendrerit,
              libero eget pulvinar maximus, quam turpis rhoncus massa, ac
              aliquet lectus nibh ac nibh. Ut et vestibulum massa. Ut blandit
              lorem quam.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
