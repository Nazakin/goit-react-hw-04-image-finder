import React, { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

const ApiKey = "40245726-79ec486d411d0a8bb323ae989";
export class App extends Component {
  
  state = {
    pictures: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    isLoadingMore: false,
    modal: false,
    selectedPicture: "",
    hasMorePictures: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchInput.value;
    this.setState(
      {
        isLoading: true,
        pictures: [],
        page: 1
      },
      () => {
        fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
          .then((res) => res.json())
          .then((data) => {
            this.setState((prev) => ({
              pictures: data.hits,
              page: prev.page + 1,
              isLoading: false,
            }));

            if (data.hits.length === 12) {
              this.setState({
                hasMorePictures: true,
              });
            } else {
              this.setState({
                hasMorePictures: false,
              });
            }
            console.log(this.state.page);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  };

  loadMore = () => {
    const searchInput = document.querySelector('[name="searchInput"]');
    const searchValue = searchInput.value;

    fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prev) => ({
          isLoadingMore: true,
        }));
        setTimeout(() => {
          this.setState((prev) => ({
            pictures: [...prev.pictures, ...data.hits],
            page: prev.page + 1,
            isLoadingMore: false,
          }));
        }, 300);

        if (data.hits.length === 12) {
          this.setState({
            hasMorePictures: true,
          });
        } else {
          this.setState({
            hasMorePictures: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  toggleModal = (e) => {
    const selectedPicture = e.target.src;
    this.setState({
      modal: true,
      selectedPicture: selectedPicture,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.setState({
        modal: false,
      });
    }
  };

  render() {
    const { pictures, isLoading, modal, selectedPicture, isLoadingMore, hasMorePictures } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery pictures={pictures} loadMore={this.loadMore} toggleModal={this.toggleModal} isLoadingMore={isLoadingMore} hasMorePictures={hasMorePictures}/>
        {isLoading && (
          <Loader/>
        )}
        {modal && (<Modal closeModal={this.closeModal} src={selectedPicture} handleKeyDown={this.handleKeyDown}/>)}
      </>
    );
  }
}
