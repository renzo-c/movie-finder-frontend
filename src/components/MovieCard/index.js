import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    cursor: 'pointer',
    maxHeight: 394,
    minHeight: 220,
    overflow: 'hidden',
  },
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden',
  },
  bgImage: {
    maxWidth: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    textAlign: 'center',
  },
});

const MovieCardComponent = ({ movie }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { title, poster_path } = movie;
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {isMouseOver ? (
        <CardContent className={classes.overlay}>{title}</CardContent>
      ) : null}
      <CardMedia className={classes.cardMedia} title={title}>
        <img className={classes.bgImage} src={poster_path} />
      </CardMedia>
    </Card>
  );
};

export default MovieCardComponent;
