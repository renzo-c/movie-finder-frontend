import React, { useState, useEffect } from 'react';
import * as movieHelpers from '../../assets/helpers/movieServices';
import Loader from '../Loader';

const MovieInfo = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieHelpers.getMovieDetails(movieId, setMovie);
  }, []);
  console.log("movie!!!", movie);
  if (movie === null) {
    return <Loader />;
  } else {
    return <>This is the info</>;
  }
};

export default MovieInfo;
