import React, { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGalleryItem/ImageGalleryItem.module.css'
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

const ApiKey = "40245726-79ec486d411d0a8bb323ae989";
export class App extends Component {
  
  state = {
    pictures: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    modal: false,
    selectedPicture: ""
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
    .then(this.setState(prev => ({
      isLoading: true,
      pictures: []
    })))
    .then(res => res.json())
      .then(data => {
          setTimeout(() => {
            this.setState(prev => ({ 
              pictures: data.hits,
              page: prev.page + 1,
              isLoading: false,
            }));
          }, 300);
        })
      .catch(error => {
        console.error(error);
      });
  };

  loadMore = () => {
    const searchInput = document.querySelector('[name="searchInput"]')
    const searchValue = searchInput.value;
    fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
    .then(this.setState(prev => ({
      isLoading: true,})))  
    .then(res => res.json())
      .then(data => {
        setTimeout(() => {
        this.setState(prev => ({ 
          pictures: [...prev.pictures, ...data.hits],
          page: prev.page + 1,
          isLoading: false,
          
        }));
      }, 300);
      })
      .catch(error => {
        console.error(error);
      });
  }
  toggleModal = (e) => {
    const selectedPicture = e.target.src;
    this.setState({
      modal: true,
      selectedPicture: selectedPicture,
    });
   
  };
  closeModal = () =>{
    this.setState({
      modal: false,
    })
  }
 handleKeyDown = (event) => {
        if (event.key === "Escape") {
            this.setState({
              modal: false,
            });
          }}

  render() {
    const { pictures, isLoading, modal, selectedPicture } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery pictures={pictures} loadMore={this.loadMore} toggleModal={this.toggleModal}/>
        <div className={css.loader}>
        {isLoading && (
          <Loader/>
        )}
  </div>
        {modal && (<Modal closeModal={this.closeModal} src={selectedPicture} handleKeyDown={this.handleKeyDown}/>)}
      </>
    );
  }
}
