
import PropTypes from 'prop-types';
import Input from '../Input';


const Colors = ({ handleColorChange }) => {

  return (
    <>
      <h2 className='text-xl font-normal mb-[20px]'>Color</h2>

      <Input
        handleChange={() => handleColorChange('All')}
        value="All"
        title="All"
        name="test1"
      />

      <Input
       handleChange={() => handleColorChange('#000000')}
        value="#000000"
        title="Black"
        name="test1"
      />

      <Input
        handleChange={() => handleColorChange('#ff0000')}
        value="#ff0000"
        title="Red"
        name="test1"
      />

      <Input
       handleChange={() => handleColorChange('#00ff00')}
        value="#00ff00"
        title="Green"
        name="test1"
      />

      <Input
         handleChange={() => handleColorChange('#0000ff')}
        value="#0000ff"
        title="Purple"
        name="test1"
      />

      <label className=' block relative pl-[20px] mb-[12px]'>
        <input
          type="radio"
          onChange={handleColorChange}
          value="white" name="test1" />
        <span style={{
          background: "white",
          border: "2px solid black"
        }}></span>
      </label>

   
    </>
  )
}

Colors.propTypes = {
  handleColorChange: PropTypes.func,
}


export default Colors
