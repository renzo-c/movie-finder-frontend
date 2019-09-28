import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import MovieInfo from './components/MovieInfo';

const App = () => (
  <Router>
    <MovieInfo path="movie/:movieId" />
    <Home path="/" />
  </Router>
);

export default App;
