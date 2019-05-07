import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";

export default class Buttons extends Component {
  render() {
    return (
      <ButtonGroup>
        {this.props.values.map((val, i) => (
          <Button color="info" key={i} onClick={() => this.props.onClick(val)}>
            {val}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}
