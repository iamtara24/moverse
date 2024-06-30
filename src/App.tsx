import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/main.css';
import Homepage from './view/homepage';
import ListSearch from './view/listSearch';
import MovieList from './view/movieList';
import MovieDetail from './view/movieDetail';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<ListSearch />} />
          <Route path="/all-movies" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
