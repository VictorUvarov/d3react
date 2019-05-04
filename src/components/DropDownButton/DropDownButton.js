import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class DropDownButton extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>{this.props.year}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.header}</DropdownItem>
          <DropdownItem divider />
          {this.props.years.map((year, idx) => (
            <DropdownItem key={idx} onClick={() => this.props.updateYear(year)}>
              {year}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
