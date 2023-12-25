import React from "react";
import css from './ImageGalery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";

export const ImageGallery = ({ pictures, loadMore, toggleModal, isLoadingMore }) => {
  return (
    <>
      <ul className={css.gallery}>
        {pictures.map(({ id, webformatURL }) => (
          <ImageGalleryItem key={id} src={webformatURL} toggleModal={toggleModal}/>
        ))}
      </ul>
      {(isLoadingMore) ?<Loader/>: <Button loadMore={loadMore} isImagesAvailable={pictures.length > 0}/>}

       
    </>
  );
};
