import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { genreList } from '../../assets/helpers/genreList';
import * as movieHelpers from '../../assets/helpers/movieServices';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 200,
    marginTop: '6em',
  },
}));

const CategoryFinder = ({
  setFilter,
  setSearching,
  setSearchStr,
  isSearching,
  currentPage,
  currentMovies,
  setCurrentMovies,
  setCurrentCat
}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: 0,
    name: '',
  });

  const handleChangeCategory = name => event => {
    event.target.value === 0 ? setFilter(false) : setFilter(true);
    if (isSearching) {
      setSearching(false);
      setSearchStr('');
      setCurrentMovies([]);
    }
    setCurrentCat(event.target.value);
    setValues({ ...values, [name]: event.target.value });
    movieHelpers.getMoviesByCategory(
      currentPage,
      event.target.value,
      setCurrentMovies,
      [],
    );
  };
  return (
    <FormControl className={classes.formControl}>
      <Select
        value={isSearching ? 0 : values.name}
        onChange={handleChangeCategory('name')}
        inputProps={{
          name: 'name',
          id: 'name-helper',
        }}
      >
        {genreList.map((genre, key) => (
          <MenuItem key={key} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CategoryFinder;
