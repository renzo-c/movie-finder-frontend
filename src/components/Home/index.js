import React, { useState, useEffect } from 'react';
import * as movieHelpers from '../../assets/helpers/movieServices';

const Home = () => {
  const [currentMovies, setCurrentMovies] = useState([]);

  useEffect(() => {
    let fetchUrl = movieHelpers.getTopMovies({ page: 1 });
    fetch(fetchUrl)
      .then(res => res.json())
      .then(result => setCurrentMovies(result));
  }, []);

  
  return <>this is my Home</>;
};

export default Home;
