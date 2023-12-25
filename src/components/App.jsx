import React, { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

const ApiKey = "40245726-79ec486d411d0a8bb323ae989";
const searchInput = document.querySelector('[name="searchInput"]')
export class App extends Component {
  
  state = {
    pictures: [],
    page: 1,
    perPage: 12,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
      .then(res => res.json())
      .then(data => {
        this.setState(prev => ({ 
          pictures: data.hits,
          page: prev.page + 1,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  loadMore = () => {
    const searchValue = searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
      .then(res => res.json())
      .then(data => {
        this.setState(prev => ({ 
          pictures: [...prev.pictures, ...data.hits],
          page: prev.page + 1,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    const { pictures } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery pictures={pictures} loadMore={this.loadMore} />
      </>
    );
  }
}
