// SearchBar.js
import React from 'react';
import styled from 'styled-components';

const SearchFilterContainer = styled.div`
  display: flex; /* Use flexbox for alignment */
  justify-content: space-between; /* Space between elements */
  margin-bottom: 1.5rem; /* Space below the search bar */
`;

const SearchInput = styled.input`
  width: 70%; /* Take up 70% of the width */
  padding: 0.5rem 1rem; /* Padding for the input */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Soft border */
  border-radius: 4px; /* Rounded corners */
  background-color: #2E2E2E; /* Dark background */
  color: white; /* White text color */
  transition: border 0.3s; /* Smooth border transition */

  &:focus {
    border: 1px solid #00A8FF; /* Highlight border on focus */
    outline: none; /* Remove outline */
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem; /* Padding for the button */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  background-color: #00A8FF; /* Button color */
  color: white; /* White text color */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &:hover {
    background-color: #007BB8; /* Darker shade on hover */
  }
`;

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  return (
    <SearchFilterContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar productos..."
      />
      <FilterButton>Filtrar</FilterButton>
    </SearchFilterContainer>
  );
};

export default SearchBar;
