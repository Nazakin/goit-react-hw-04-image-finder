import React from "react";
import css from './SearchBar.module.css'
export const Searchbar = ({ handleSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          name="searchInput"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};