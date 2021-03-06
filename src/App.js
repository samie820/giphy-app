import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Image from "./components/Image";
import spinner from "./assets/ajax-loader.gif";
import Search from "./components/Search";

/*
  The use of .bind() on my instance methods was a personal choice,
  an alternative will be to use arrow functions
*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      images: [],
      errorMessage: null
    };

    this.search = this.search.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  // function to reload the page when the header title is clicked
  refreshPage() {
    window.location.reload();
  }

  // function to make the request to the GIPHY API with the passed in search term
  search(searchValue) {
    if (searchValue !== "") {
      this.setState({
        loading: true,
        errorMessage: null
      });

      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=g0BfnB3XSuvWmc1TE7vUzDAaBxGWc9jy&q=${searchValue}&limit=25&offset=0&rating=G&lang=en`
      )
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.meta.status === 200) {
            this.setState({
              loading: false,
              images: jsonResponse.data
            });
          }
        })
        .catch(error => {
          this.setState({
            loading: false,
            errorMessage: "Error Loading GIFs"
          });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Header onClick={this.refreshPage} text="GIPHY" />
        <Search loading={this.state.loading} search={this.search} />
        <p className="App-intro">Sharing a few of our favourite GIF's</p>
        <div className="images">
          {this.state.loading && !this.state.errorMessage ? (
            <img className="spinner" src={spinner} alt="Loading spinner" />
          ) : this.state.errorMessage ? (
            <div className="errorMessage">{this.state.errorMessage}</div>
          ) : (
            this.state.images.map((image, index) => (
              <Image key={image.id} image={image} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
