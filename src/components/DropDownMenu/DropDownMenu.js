import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      cause: props.causes[0]
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>{this.state.cause}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.header}</DropdownItem>
          <DropdownItem divider />
          {this.props.causes.map((cause, idx) => (
            <DropdownItem
              key={idx}
              onClick={() => {
                this.props.updateCause(cause);
                this.setState({cause: cause});
              }}
            >
              {cause}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
