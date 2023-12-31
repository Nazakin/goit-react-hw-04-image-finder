import React, { useState, useEffect, useRef } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { handleFetch } from "./fetch";

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState("");
  const [hasMorePictures, setHasMorePictures] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setPictures([]);
      setPage(1);
      setIsLoading(true);
      pageRef.current = 1;

      await handleFetch({
        searchValue,
        setPictures,
        setPage,
        pageRef, 
        setIsLoading,
        setIsLoadingMore,
        setHasMorePictures,
      });
    };

    fetchData();
  }, [searchValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchValue = e.target.searchInput.value;
    setSearchValue(newSearchValue);
  };

  const loadMore = () => {
    const searchInput = document.querySelector('[name="searchInput"]');
    const searchValue = searchInput.value;
    pageRef.current = page;
    handleFetch({
      searchValue,
      setPictures: (newPictures) => setPictures((prevPictures) => [...prevPictures, ...newPictures]),
      setPage,
      pageRef, 
      setIsLoading,
      setIsLoadingMore,
      setHasMorePictures,
    });
  };

  const toggleModal = (e) => {
    const selectedPicture = e.target.src;
    setModal(true);
    setSelectedPicture(selectedPicture);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery pictures={pictures} loadMore={loadMore} toggleModal={toggleModal} isLoadingMore={isLoadingMore} hasMorePictures={hasMorePictures} />
      {isLoading && (
        <Loader />
      )}
      {modal && (<Modal closeModal={closeModal} src={selectedPicture} handleKeyDown={handleKeyDown} />)}
    </>
  );
};





















// import React, { Component } from "react";
// import { Searchbar } from "./SearchBar/Searchbar";
// import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
// import { Modal } from "./Modal/Modal";
// import { Loader } from "./Loader/Loader";

// const ApiKey = "40245726-79ec486d411d0a8bb323ae989";
// export class App extends Component {
  
//   state = {
//     pictures: [],
//     page: 1,
//     perPage: 12,
//     isLoading: false,
//     isLoadingMore: false,
//     modal: false,
//     selectedPicture: "",
//     hasMorePictures: false,
//   };

//   componentDidMount() {
//     document.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const searchValue = e.target.searchInput.value;
//     this.setState(
//       {
//         isLoading: true,
//         pictures: [],
//         page: 1
//       },
//       () => {
//         fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
//           .then((res) => res.json())
//           .then((data) => {
//             this.setState((prev) => ({
//               pictures: data.hits,
//               page: prev.page + 1,
//               isLoading: false,
//             }));

//             if (data.hits.length === 12) {
//               this.setState({
//                 hasMorePictures: true,
//               });
//             } else {
//               this.setState({
//                 hasMorePictures: false,
//               });
//             }
//             console.log(this.state.page);
//           })
          // .catch((error) => {
          //   console.error(error);
          // });
//       }
//     );
//   };

//   loadMore = () => {
//     const searchInput = document.querySelector('[name="searchInput"]');
//     const searchValue = searchInput.value;

//     fetch(`https://pixabay.com/api/?q=${searchValue}&page=${this.state.page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
//       .then((res) => res.json())
//       .then((data) => {
//         this.setState((prev) => ({
//           isLoadingMore: true,
//         }));
//         setTimeout(() => {
//           this.setState((prev) => ({
//             pictures: [...prev.pictures, ...data.hits],
//             page: prev.page + 1,
//             isLoadingMore: false,
//           }));
//         }, 300);

//         if (data.hits.length === 12) {
//           this.setState({
//             hasMorePictures: true,
//           });
//         } else {
//           this.setState({
//             hasMorePictures: false,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   toggleModal = (e) => {
//     const selectedPicture = e.target.src;
//     this.setState({
//       modal: true,
//       selectedPicture: selectedPicture,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modal: false,
//     });
//   };

  // handleKeyDown = (event) => {
  //   if (event.key === "Escape") {
  //     this.setState({
  //       modal: false,
  //     });
  //   }
  // };

//   render() {
//     const { pictures, isLoading, modal, selectedPicture, isLoadingMore, hasMorePictures } = this.state;
//     return (
//       <>
//         <Searchbar handleSubmit={this.handleSubmit} />
//         <ImageGallery pictures={pictures} loadMore={this.loadMore} toggleModal={this.toggleModal} isLoadingMore={isLoadingMore} hasMorePictures={hasMorePictures}/>
//         {isLoading && (
//           <Loader/>
//         )}
//         {modal && (<Modal closeModal={this.closeModal} src={selectedPicture} handleKeyDown={this.handleKeyDown}/>)}
//       </>
//     );
//   }
// }

