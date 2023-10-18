
const GET_ALL_BREEDS = 'dogs/GET_ALL_BREEDS';
const POST_DOG_DETAILS = 'dogs/POST_DOG_DETAILS';


const getAllBreeds = (breeds) => ({
  type: GET_ALL_BREEDS,
  payload: breeds,
});

const postDogDetails = (details) => ({
  type: POST_DOG_DETAILS,
  payload: details,
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
      dispatch(getAllBreeds(data));
    } else {
      console.log('response bad')
    }
  } catch (error) {
    console.error(`An error occurred while fetching dog breeds: ${error.message}`);
    throw error;
  }
};

export const fetchDogDetails = (dogIds) => async (dispatch) => {
  try {
    const apiUrl = new URL('https://frontend-take-home-service.fetch.com/dogs');
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dogIds),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('this is the data', data);
      dispatch(postDogDetails(data));
    } else {
      console.log('response bad', response.json());
    }
  } catch (error) {
    console.error(`An error occurred while fetching dog details: ${error.message}`);
    throw error;
  }
};



const initialState = {
  dogBreeds: [],   dogs: [], individualDog: {}
};

const dogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        dogBreeds: action.payload,
      };
      case POST_DOG_DETAILS:
        return {
          ...state,
          dogs: action.payload,
        };
    default:
      return state;
  }
};

export default dogsReducer
