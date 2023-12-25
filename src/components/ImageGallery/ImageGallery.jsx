import React from "react";
import css from './ImageGalery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";


export const ImageGallery = ({ pictures, loadMore, toggleModal }) => {
  return (
    <>
      <ul className={css.gallery}>
        {pictures.map(({ id, webformatURL }) => (
          <ImageGalleryItem key={id} src={webformatURL} toggleModal={toggleModal}/>
        ))}
      </ul>
       <Button loadMore={loadMore} isImagesAvailable={pictures.length > 0}/>
       
    </>
  );
};
