import React from "react";
import css from './ImageGalery.module.css'

export const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.gallery}>
      {pictures.map(({ id, webformatURL }) => (
        <li key={id} className={css.gallery_item}>
          <img src={webformatURL} alt="" />
        </li>
      ))}
    </ul>
  );
};
