import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import DogSearch from './components/DogSearch';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/search" element={<DogSearch />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
