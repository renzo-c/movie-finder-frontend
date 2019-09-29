import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const LoaderComponent = () => {
  const classes = useStyles();
  return (
    <CircularProgress
      className={classes.progress}
      top={0}
      left={0}
      size={80}
      status={'loading'}
    />
  );
};

export default LoaderComponent;
