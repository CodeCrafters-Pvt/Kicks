import PropTypes from 'prop-types';
import Category from './Category/Category';
import Colors from './Colors/Colors';
import Price from './Price/Price';
const FilterPanel = ({handleColorChange, handleCategoryChange}) => {

  return (
    <>

      <section className=" p-4  border-gray-300  border-r-2 h-auto flex-col ">
        <Category handleCategoryChange={handleCategoryChange} />
        <Price />
        <Colors handleColorChange={handleColorChange} />
      </section>

    </>
  );
};

FilterPanel.propTypes = {
  handleCategoryChange: PropTypes.func,
  handleColorChange: PropTypes.func,
}

export default FilterPanel;
