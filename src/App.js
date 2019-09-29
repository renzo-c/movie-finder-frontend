import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import MovieInfo from './components/MovieInfo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    marginBottom: '15em',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBarContainer}>
        <Toolbar>
          <Typography variant="h6" align="center">
            <div>Movies Finder</div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <MovieInfo path="movie/:movieId" />
        <Home path="/" />
      </Router>
    </>
  );
};

export default App;
