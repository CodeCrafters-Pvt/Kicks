
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='w-1/6 pl-8 p-4'>
      <input
        type='text'
        placeholder='Search by product name'
        value={searchTerm}
        onChange={onSearchChange}
        className='border p-2 rounded'
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
