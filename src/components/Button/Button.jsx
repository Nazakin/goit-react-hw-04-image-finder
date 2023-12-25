import React from "react";

export const Button = ({ loadMore, isImagesAvailable }) => {
  return (
    <>
   { isImagesAvailable &&(<button type="button" onClick={loadMore}>
      Load more
    </button>)}
    </>
  );
};
