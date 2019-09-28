import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { navigate } from '@reach/router';


const styles = {
  dialogContent: backgroundUrl => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: '2em',
    margin: 50,
  }),
  background: {
    backgroundColor: 'black',
    paddingTop: '5em',
  },
  buttonAlign: {
    marginTop: '1em',
  },
};

const MovieContainer = ({ movie }) => {
  const m = movie[0];
  const handleClick = () => {
    navigate(`/`);
  }
  return (
    <Container style={styles.background}>
      <Row>
        <div style={styles.dialogContent(m.backdrop_path)}>
          <h1>{m.title}</h1>

          <h5>{m.genres[0].name}</h5>
          <p>{m.overview}</p>
          <p>Popularity: {m.popularity}</p>
          <p>Budget: ${m.budget}</p>
          <Button style={styles.buttonAlign} onClick={() => handleClick()}>Back</Button>
        </div>
      </Row>
    </Container>
  );
};

export default MovieContainer;
