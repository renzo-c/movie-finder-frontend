import React, { useState, useEffect } from 'react';
import * as movieHelpers from '../../assets/helpers/movieServices';
import Loader from '../Loader';
import MovieContainer from '../MovieContainer';

const styles = {
  background: {
    height: '100vh',
    backgroundColor: 'black',
  },
};

const MovieInfo = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieHelpers.getMovieDetails(movieId, setMovie);
  }, []);

  console.log('movieInfo', movie);
  if (movie === null) {
    return <Loader />;
  } else {
    return (
      <div style={styles.background}>
        <MovieContainer movie={movie} />;
      </div>
    );
  }
};

export default MovieInfo;
