import React, { Component } from "react";

function withDebounce(callback, time = 1500) {
  let interval;
  return (search) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(search);
    }, time);
  };
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSearchInputChanges = this.handleSearchInputChanges.bind(this);
    this.callSearchFunction = this.callSearchFunction.bind(this);
    this.debouncedSearch = withDebounce(props.search);
  }

  handleSearchInputChanges(e) {
    this.debouncedSearch(e.target.value);
    this.setState(
      {
        searchValue: e.target.value
      });
  }

  callSearchFunction(e) {
    this.props.search(this.state.searchValue);
    this.setState({
      searchValue: ""
    });
  }

  render() {
    return (
      <div className="search">
        <input
          value={this.state.searchValue}
          onChange={this.handleSearchInputChanges}
          type="text"
        />

        <input disabled={this.props.disabled} onClick={this.callSearchFunction} type="submit" value="SEARCH" />
      </div>
    );
  }
}

export default Search;
