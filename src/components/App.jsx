import React, { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';

const ApiKey = "40245726-79ec486d411d0a8bb323ae989";

export class App extends Component {
  
  state = {
    pictures: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=1&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pictures: data.hits })
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { pictures } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery pictures={this.state.pictures} />
      </>
    );
  }
}
