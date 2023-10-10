import React from 'react';
import { useSelector } from 'react-redux';

function Homepage() {
  const isAuthenticated = useSelector(state => state.session.user !== null);

  return (
    <div>
      {isAuthenticated ? (
        // Render content for authenticated users
        <div>
          <h1>Welcome, User!</h1>
          {/* Other content for authenticated users */}
        </div>
      ) : (
        // Render content for non-authenticated users
        <div>
          <h1>Welcome to the Homepage</h1>
          <p>Please log in to access more features.</p>
          {/* Other content for non-authenticated users */}
        </div>
      )}
    </div>
  );
}

export default Homepage;
