import PropTypes from 'prop-types';

const Input = ({handleChange, value, title, name, color}) => {
    
  return (
    <label className=' block relative pl-[20px] mb-[12px]'>
    <input  onChange={handleChange} value={value} type="radio" name={name}/>
   <span
        style={{ backgroundColor: color }}
      ></span> {title}
   </label>
  )
}

Input.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  };
export default Input