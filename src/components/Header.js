import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header role="button" onClick={this.props.onClick} className="App-header">
        <h2>
          {this.props.text}
        </h2>
      </header>
    );
  }
}

export default Header;