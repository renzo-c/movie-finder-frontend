import { MOVIE_DB_API_KEY } from '../../key';
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';
import * as movieList from '../../assets/helpers/movieList';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams).forEach(
      paramName =>
        (baseUrl += `&${paramName}=${queryParams[paramName]}`),
    );
  }
  return baseUrl;
};

export const getTopMovies = ({ page }, setFunc) => {
  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page,
  });
  fetch(fullUrl)
    .then(res => res.json())
    .then(res => movieList.getMoviesList(res))
    .then(res => {
      return setFunc(res);
    });
  return null;
};

export const searchMovies = ({ page, query }, setFunc) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query,
  });
  fetch(fullUrl)
    .then(res => res.json())
    .then(res => movieList.getMoviesList(res))
    .then(res => {
      return setFunc(res);
    });
  return null;
};

export const getMovieDetails = async ({ movieId }) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
};
