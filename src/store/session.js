// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = () => ({
  type: SET_USER,
  payload: {
    'testKey': 'testValue'
  }
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };


export const loginAuth = (name, email) => async (dispatch) => {
  try {
    const response = await fetch(`https://frontend-take-home-service.fetch.com/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email
      })
    });

    if (response.ok) {
      dispatch(setUser());
    } else {
      if (response.status === 400) {
        const errorText = await response.text();
        return { errors: [errorText] };
      } else if (response.status === 401) {
        return { errors: ['Unauthorized'] };
      } else {
        return { errors: ['An error occurred. Please try again.'] };
      }
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    throw error;
  }
};


export const logout = () => async (dispatch) => {
  const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload.testValue };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
};


export default sessionReducer
