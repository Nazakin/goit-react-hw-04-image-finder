import React from "react";

export const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore}>
      Load more
    </button>
  );
};
