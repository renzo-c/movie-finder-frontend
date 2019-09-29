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

export const getTopMovies = ({ page }, setFunc, currentMovies) => {
  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page,
  });
  fetch(fullUrl)
    .then(res => res.json())
    .then(res => movieList.getMoviesList(res))
    .then(res => {
      let newMovies = [...currentMovies, ...res];
      return setFunc(newMovies);
    });
  return null;
};

export const searchMovies = (
  { page, query },
  setFunc,
  currentMovies,
) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query,
  });
  fetch(fullUrl)
    .then(res => res.json())
    .then(res => movieList.getMoviesList(res))
    .then(res => {
      let newMovies = [...currentMovies, ...res];
      return setFunc(newMovies);
    });
  return null;
};

export const getMovieDetails = (movieId, setFunc) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl)
    .then(res => res.json())
    .then(res => {
      let tmpObj = { results: [res] };
      return movieList.getMoviesList(tmpObj);
    })
    .then(res => {
      return setFunc(res);
    });
};

export const getMoviesByCategory = (
  page,
  categoryId,
  setFunc,
  currentMovies,
) => {
  const fullUrl = createMovieDbUrl(`/discover/movie`, {
    with_genres: categoryId,
    page,
  });
  fetch(fullUrl)
    .then(res => res.json())
    .then(res => movieList.getMoviesList(res))
    .then(res => {
      let newMovies = [...currentMovies, ...res];
      return setFunc(newMovies);
    });
  return null;
};
