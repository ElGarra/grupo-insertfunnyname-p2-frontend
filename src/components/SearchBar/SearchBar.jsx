import React from 'react';
import './SearchBar.scss';

const SearchBar = () => {
  const prompt = 'Search';
  return (
    <form className="navbar-form">
      <label htmlFor="search">
        {prompt}
        <input id="search" type="text" />
      </label>
    </form>
  );
};

export default SearchBar;
