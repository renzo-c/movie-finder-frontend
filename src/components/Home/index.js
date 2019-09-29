import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row } from 'react-bootstrap';
import * as movieHelpers from '../../assets/helpers/movieServices';
import MovieList from '../MovieList';
import Loader from '../Loader';
import CategoryFinder from '../CategoryFinder';
import * as scrollHelpers from '../../assets/helpers/scrollDown';

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    marginBottom: '15em',
  },
  textFieldContainer: {
    margin: '5em 1em 2em 1em',
  },
}));

const Home = () => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStr, setSearchStr] = useState('');
  const [currentCat, setCurrentCat] = useState(0);

  useEffect(() => {
    movieHelpers.getTopMovies(
      { page: currentPage },
      setCurrentMovies,
      currentMovies,
    );
    window.onscroll = handleScroll;
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching) {
      setCurrentPage(currentPage + 1);
      if (isSearching && !isFiltering) {
        movieHelpers.searchMovies(
          {
            page: currentPage,
            query: searchStr,
          },
          setCurrentMovies,
          currentMovies,
        );
      } else if (isFiltering) {
        movieHelpers.getMoviesByCategory(
          currentPage,
          currentCat,
          setCurrentMovies,
          currentMovies,
        );
      } else if (!isSearching && !isFiltering) {
        movieHelpers.getTopMovies(
          { page: currentPage },
          setCurrentMovies,
          currentMovies,
        );
      }
      setIsFetching(false);
    }
  }, [isFetching]);

  const handleScroll = () => {
    if (!isFetching) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(
        window,
      );
      if (percentageScrolled > 0.8) {
        setIsFetching(true);
      }
    }
  };

  const handleSearchByName = e => {
    const str = e.target.value.toLowerCase().trim();
    setSearchStr(str);
    if (str.length !== 0) {
      setIsSearching(true);
      if (isFiltering) {
        setIsFiltering(false);
        setCurrentMovies([]);
      }
      movieHelpers.searchMovies(
        {
          page: 1,
          query: str,
        },
        setCurrentMovies,
        [],
      );
    } else {
      setIsSearching(false);
      setSearchStr(null);
      movieHelpers.getTopMovies({ page: 1 }, setCurrentMovies, []);
    }
  };

  const classes = useStyles();
  if (currentMovies === undefined) {
    return <Loader />;
  } else {
    const movies = currentMovies;
    return (
      <Container>
        <div>
          <TextField
            value={searchStr}
            className={classes.textFieldContainer}
            label="Search Movie"
            onChange={e => handleSearchByName(e)}
          />
          <CategoryFinder
            setFilter={setIsFiltering}
            setSearching={setIsSearching}
            setSearchStr={setSearchStr}
            isSearching={isSearching}
            currentPage={currentPage}
            currentMovies={currentMovies}
            setCurrentMovies={setCurrentMovies}
            setCurrentCat={setCurrentCat}
          />
        </div>
        <Row>
          <MovieList movies={movies} />
        </Row>
      </Container>
    );
  }
};

export default Home;
