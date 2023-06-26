import styles from './filter.module.css';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/filter/filter-slice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      <span className={styles.span}>Find contacts by name</span>
      <input type="text" name={filter} value={filter} onChange={handleChangeFilter} />
    </label>
  );
};

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
export default Filter;
