import React from "react";
import css from './ImageGalery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";

export const ImageGallery = ({ pictures, loadMore, toggleModal, isLoadingMore, hasMorePictures }) => {
  return (
    <>
      <ul className={css.gallery}>
        {pictures.map(({ id, webformatURL }, index) => (
          <ImageGalleryItem key={`${id}-${index}`} src={webformatURL} toggleModal={toggleModal}/>
        ))}
      </ul>
      {isLoadingMore ? <Loader/> : (hasMorePictures && <Button loadMore={loadMore} hasMorePictures={hasMorePictures}/>)}
    </>
  );
};




