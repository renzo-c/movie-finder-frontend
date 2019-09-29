import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row } from 'react-bootstrap';
import * as movieHelpers from '../../assets/helpers/movieServices';
import MovieList from '../MovieList';
import Loader from '../Loader';
import CategoryFinder from '../CategoryFinder';


const useStyles = makeStyles(theme => ({
  appBarContainer: {
    marginBottom: '15em',
  },
  textFieldContainer: {
    margin: '5em 1em 2em 1em',
  },
}));

const Home = () => {
  const [currentMovies, setCurrentMovies] = useState(undefined);

  useEffect(() => {
    movieHelpers.getTopMovies({ page: 1 }, setCurrentMovies);
  }, []);

  const handleSearchByName = e => {
    const str = e.target.value.toLowerCase().trim();
    if (str.length !== 0) {
      movieHelpers.searchMovies(
        {
          page: 1,
          query: str,
        },
        setCurrentMovies,
      );
    } else {
      movieHelpers.getTopMovies({ page: 1 }, setCurrentMovies);
    }
  };
  const classes = useStyles();
  console.log('currentMovies', currentMovies);
  if (currentMovies === undefined) {
    return <Loader />;
  } else {
    const movies = currentMovies;
    return (
      <Container>
        <div>
          <TextField
            className={classes.textFieldContainer}
            label="Search Movie"
            onChange={e => handleSearchByName(e)}
          />
          <CategoryFinder setFunc={setCurrentMovies} />
        </div>
        <Row>
          <MovieList movies={movies} />
        </Row>
      </Container>
    );
  }
};

export default Home;
