import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import DogSearch from './components/DogSearch';
import { useSelector } from "react-redux";


function App() {
  const isAuthenticated = useSelector(state => state.session?.user !== null);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/search" element={<DogSearch />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
