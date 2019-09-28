import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row } from 'react-bootstrap';
import * as movieHelpers from '../../assets/helpers/movieServices';
import * as movieList from '../../assets/helpers/movieList';
import MovieList from '../MovieList';
import Loader from '../Loader';

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    marginBottom: '15em',
  },
  textFieldContainer: {
    margin: '5em 1em 2em 1em',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [currentMovies, setCurrentMovies] = useState(undefined);

  useEffect(() => {
    let fetchUrl = movieHelpers.getTopMovies({ page: 1 });
    fetch(fetchUrl)
      .then(res => res.json())
      .then(resJson => setCurrentMovies(resJson));
  }, []);

  const handleSearch = e => {
    const str = e.target.value.toLowerCase().trim();
    if (str.length !== 0) {
      let fetchUrl = movieHelpers.searchMovies({
        page: 1,
        query: str,
      });
      fetch(fetchUrl)
        .then(res => res.json())
        .then(resJson => setCurrentMovies(resJson));
    }
  };

  if (currentMovies === undefined) {
    return <Loader />;
  } else {
    const movies = movieList.getMoviesList(currentMovies);
    return (
      <>
        <AppBar className={classes.appBarContainer}>
          <Toolbar>
            <Typography variant="h6" align="center">
              <div>Movies Finder</div>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Row>
            <TextField
              className={classes.textFieldContainer}
              label="Search Movie"
              onChange={e => handleSearch(e)}
            />
          </Row>
          <Row>
            <MovieList movies={movies} />
          </Row>
        </Container>
      </>
    );
  }
};

export default Home;
