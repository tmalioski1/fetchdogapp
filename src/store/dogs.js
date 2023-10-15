
const GET_ALL_BREEDS = 'dogs/GET_ALL_BREEDS';


const getAllBreeds = (breeds) => ({
  type: GET_ALL_BREEDS,
  payload: breeds,
});


export const fetchDogBreeds = () => async (dispatch) => {
  try {
    const apiUrl = new URL('https://frontend-take-home-service.fetch.com/dogs/breeds');
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('this is the breedlist data', data)
      dispatch(getAllBreeds(data));
    } else {
      // Handle errors
    }
  } catch (error) {
    console.error(`An error occurred while fetching dog breeds: ${error.message}`);
    throw error;
  }
};


const initialState = {
  dogBreeds: [], individualDog: {}
};

const dogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        dogBreeds: action.payload,
      };
    default:
      return state;
  }
};

export default dogsReducer
