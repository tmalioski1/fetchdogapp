import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../../store/search';
import { fetchDogBreeds } from '../../store/dogs';

const SearchComponent = () => {
  const dispatch = useDispatch();

  const selectSearchResults = (state) => state.search?.searchResults;

  const searchResults = useSelector(selectSearchResults) || [];
  console.log('these are the search results', searchResults)


  const [filterOptions, setFilterOptions] = useState({
    breeds: [],
    page: 1
  });

  const [sortOption, setSortOption] = useState('asc');

  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, [dispatch]);

  const handleSearch = () => {

    dispatch(fetchSearchResults(filterOptions, sortOption));
  };

  return (
    <div>
      <h2>Search for Dogs</h2>
      <div>
        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          id="breed"
          value={filterOptions.breeds.join(',')}
          onChange={(e) => setFilterOptions({ ...filterOptions, breeds: e.target.value.split(',') })}
        />
      </div>
      <div>
        <label htmlFor="sort">Sort:</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button onClick={handleSearch}>Search</button>
      <div>
        <ul>
          {searchResults.map((dog) => (
            <li key={dog.id}>
              <p>Name: {dog.name}</p>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age} years old</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => setFilterOptions({ ...filterOptions, page: filterOptions.page - 1 })}>
          Previous Page
        </button>
        <button onClick={() => setFilterOptions({ ...filterOptions, page: filterOptions.page + 1 })}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
