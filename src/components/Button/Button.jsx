import React from "react";
import css from './Button.module.css'

export const Button = ({ loadMore, hasMorePictures}) => {
  return (
    <div className={css.button_div}>
   { hasMorePictures &&(<button type="button" className={css.load_more_button} onClick={loadMore}>
      Load more
    </button>)}
    </div>
  );
};
