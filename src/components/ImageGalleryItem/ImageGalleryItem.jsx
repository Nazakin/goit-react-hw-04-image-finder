import React from "react";
import css from './ImageGalleryItem.module.css'
export const ImageGalleryItem = ({src, id, toggleModal} ) => {
    return(
    <li className={css.gallery_item} key={id} onClick={toggleModal}>
    <img src={src} alt="" />
  </li>
  )
}
