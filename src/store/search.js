// searchActions.js

const UPDATE_SEARCH_RESULTS = 'search/UPDATE_SEARCH_RESULTS';


const updateSearchResults = (results) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload: results,
});



export const fetchSearchResults = (filterOptions, sortOption) => async (dispatch) => {
    try {
      const apiUrl = new URL('https://frontend-take-home-service.fetch.com/dogs/search');
      apiUrl.searchParams.set('breeds', filterOptions.breeds.join(','));
      apiUrl.searchParams.set('sort', `breed:${sortOption}`);

      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });



      if (response.ok) {
        const data = await response.json();
        console.log('this is the data', data)
        console.log('total', data.total);


        dispatch(updateSearchResults({
            resultIds: data.resultIds,
            next: data.next,
            total: data.total,
            prev: data.prev,
          }));
              }
              else {
        // Handle errors
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      throw error;
    }
  };

  const initialState = {
    searchResults: [],
    next: null,
    total: 0,
    prev: null,
  };


  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SEARCH_RESULTS:
        return {
          ...state,
          searchResults: action.payload.resultIds,
          next: action.payload.next,
          total: action.payload.total,
          prev: action.payload.prev,
        };

      default:
        return state;
    }
  };

export default searchReducer
