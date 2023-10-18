import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../../store/search';
import { fetchDogBreeds, fetchDogDetails } from '../../store/dogs';


const SearchComponent = () => {
  const dispatch = useDispatch();


  const searchResults = useSelector(state => state.search?.searchResults)
  const dogDetails = useSelector(state => state.dogs?.dogs)
  console.log('these are the dogDetails', dogDetails)
  const [filterOptions, setFilterOptions] = useState({
    breeds: [],
    page: 1,
  });

  const [sortOption, setSortOption] = useState('asc');





  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, [dispatch]);

  useEffect(() => {
    if (searchResults.length > 0) {
      dispatch(fetchDogDetails(searchResults))
    }
  }, [dispatch, searchResults]);

  const handleSearch = () => {
    dispatch(fetchSearchResults(filterOptions, sortOption));
  };
  console.log('these are the dogDetails---', dogDetails)

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
        {searchResults.map((dogId) => {
          const matchedDog = dogDetails.find((dogDetail) => dogDetail.id === dogId);

          if (matchedDog) {
            return (
              <li key={dogId}>
                <p>Name: {matchedDog.name}</p>
                <p>Breed: {matchedDog.breed}</p>
                <p>Age: {matchedDog.age} years old</p>
              </li>
            );
          }

          return null
        })}
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
