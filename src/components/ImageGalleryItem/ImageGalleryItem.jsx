import React from "react";
import css from './ImageGalleryItem.module.css'
export const ImageGalleryItem = ({src} ) => {
    return(
    <li className={css.gallery_item}>
    <img src={src} alt="" />
  </li>
  )
}