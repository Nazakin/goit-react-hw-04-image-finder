import React from "react";
import css from './Button.module.css'

export const Button = ({ loadMore, isImagesAvailable }) => {
  return (
    <div className={css.button_div}>
   { isImagesAvailable &&(<button type="button" className={css.load_more_button} onClick={loadMore}>
      Load more
    </button>)}
    </div>
  );
};
