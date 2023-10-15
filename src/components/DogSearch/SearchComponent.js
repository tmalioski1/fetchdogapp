import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../../store/search';
import { fetchDogBreeds } from '../../store/dogs';

const SearchComponent = () => {
  const dispatch = useDispatch();

  // Define the selector directly in your component
  const selectSearchResults = (state) => state.search?.searchResults;

  const searchResults = useSelector(selectSearchResults) || [];
  console.log('these are searchResults', searchResults)

  const [filterOptions, setFilterOptions] = useState({
    breeds: [], // Initialize with an empty array for breed filter
    // Add more filter options (age, location, etc.) as needed
  });

  const [sortOption, setSortOption] = useState('asc'); // Initialize with default sort option

  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, []);
  const handleSearch = () => {
    // Dispatch the fetchSearchResults thunk with filter and sort options
    dispatch(fetchSearchResults(filterOptions, sortOption));
  };

  return (
    <div>
      <h2>Search for Dogs</h2>
      <div>
        <label htmlFor="Search">Search:</label>
        <input
          type="text"
          id="search"
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
            <li key={dog.id}>{dog.name}, {dog.breed}, {dog.age} years old</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
