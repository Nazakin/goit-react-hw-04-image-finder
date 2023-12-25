import React from "react";
import css from './Modal.module.css'

export const Modal = ({closeModal, src, handleKeyDown}) => {
    document.addEventListener("keydown", handleKeyDown);
    return(
        <div className={css.overlay} onClick={closeModal}>
  <div className={css.modal}>
    <img src={src} alt="" />
  </div>
</div>
    )
}
