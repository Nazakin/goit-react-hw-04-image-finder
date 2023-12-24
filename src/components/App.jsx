import React, { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";

const ApiKey = "40245726-79ec486d411d0a8bb323ae989";

export class App extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const searchValue =  e.target.searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=1&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
