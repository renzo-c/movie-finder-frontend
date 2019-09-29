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

const CategoryFinder = ({ setFunc }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: 0,
    name: '',
  });

  const handleChangeCategory = name => event => {
    setValues({ ...values, [name]: event.target.value });
    movieHelpers.getMoviesByCategory(event.target.value, setFunc);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={values.name}
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
