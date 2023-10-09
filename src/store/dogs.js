
const GET_ALL_DOGS = 'dog/GET_ALL_DOGS'
const GET_ONE_DOG = 'dog/GET_ONE_DOG'
const POST_DOG = 'dog/POST_DOG'
const UPDATE_DOG = 'dog/UPDATE_DOG'
const DELETE_DOG = 'dog/DELETE_DOG'

const getAll = (dogs) => ({
    type: GET_ALL_DOGS,
    dogs
})
const getOne = (dog) => ({
    type:GET_ONE_DOG,
    dog
})

const postDog = (dog) => ({
  type: POST_DOG,
  dog
})

const updateDog = (dog) => ({
  type: UPDATE_DOG,
  dog
})


const deleteDog = (dogId) => ({
  type: DELETE_DOG,
  dogId
})

export const getOneDog = (id) => async(dispatch) => {
    const response = await fetch(`/api/books/${id}`)
    if(response.ok){
        const dog = await response.json()
        dispatch(getOne(dog))
        return dog
    }
    return response
}

export const getAllDogs = () => async (dispatch) => {
    const response = await fetch(`/api/books/`);
    if (response.ok) {
      const dogs = await response.json();
      dispatch(getAll(dogs));
    }
    return response
  };

  export const createDog = (newDog) => async (dispatch) => {
    const response = await fetch('/api/books/', {
      method: 'POST',
      body: newDog

    })
    if (response.ok) {
      const createdNewDog = await response.json();
      dispatch(postDog(createdNewDog));
      return createdNewDog;
    }

  }

  export const updateADog = (payload, dogId) => async dispatch => {
    const response = await fetch(`/api/books/${dogId}`, {
      method: 'PUT',
      body: payload
    })
    if(response.ok) {
      const editedDog = await response.json()
      dispatch(updateDog(editedDog))
    return editedDog
    }
  }


  export const deleteADog = (dogId) => async(dispatch) => {
    const response = await fetch(`/api/books/${dogId}`, {
     method: 'DELETE',
    })
    if (response.ok) {
      const deletionResponse = await response.json();
      dispatch(deleteDog(dogId));
      return deletionResponse
    }
 }



const initialState = { allDogs: {}, singleDog: {} }

const dogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS: {
          const newState = { allDogs: {}, singleDog: {} }
          action.dogs.dogs.forEach(dog => {
            newState.allDogs[dog.id] = dog
          });

          return newState;
        }

        case GET_ONE_DOG:{
            const newState = { allDogs: {...state.allDogs}, singleDog: {} }
            const specificDog = action.dog
            newState.singleDog = specificDog
            return newState
        }

        case POST_DOG: {
          const newState = { ...state, allBooks: { ...state.allBooks}}
          newState.allBooks[action.book.id] = action.book;
          return newState
        }

        case UPDATE_DOG: {
          const newState = {...state}
          newState.allBooks[action.book.id] = action.book;
          newState.singleBook.book = action.book;
          return newState
        }

        case DELETE_DOG: {
          const newState = {...state, allBooks: { ...state.allBooks}}
          delete newState.allBooks[action.id]
          return newState
        }

        default:
          return state

      }

}


export default dogsReducer
