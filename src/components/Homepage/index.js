import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAuth } from '../../store/session';


function Homepage() {
  const isAuthenticated = useSelector(state => state.session?.user !== null);
  const currentUser = useSelector(state => state.sessuion?.user )
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate()

const onLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await dispatch(loginAuth(name, email));
    if (response.ok) {
      // Successful response, do something if needed
      history('/search'); // Navigate to the search route
    } else {
      // Handle non-JSON response (e.g., plain text or HTML)
      const data = await response.text(); // Read the response as text
      console.error(`Bad Request: ${data}`);
      setErrors([`Bad Request: ${data}`]);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    setErrors([`An error occurred: ${error.message}`]);
  }
};




  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {currentUser}!</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome to the Homepage</h1>
          <p>Please log in to access more features.</p>
          <form className='log-in-form-container' onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='email-container'>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='name-container'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={name}
              onChange={updateName}
            />
            </div>
            <button id='user-login' type='submit'>Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Homepage;
