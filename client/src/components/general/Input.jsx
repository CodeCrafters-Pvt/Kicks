import { useEffect, useState,useRef } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip'
import { MdErrorOutline } from 'react-icons/md'
import { motion } from 'framer-motion';

export default function Input({
  field,
  label,
  isRequired,
  type,
  placeholder,
  contStyle,
  inputStyle,
  labelStyle,
  textArea=false,
  options,
  setFieldValue,
  isBtnClicked,
  errorId,
  errorMsg
}) 
{
  const inputRef = useRef(null)
  const [isInputFocused, setInputFocused] = useState(false);
  const [initialClick, setInitialClick] = useState(false);

  useEffect(()=>{
    if(!initialClick) setInitialClick(isBtnClicked)
  },[isBtnClicked])

  const handleDivClick = () => {
    setInputFocused(true)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`mx-2 my-2 flex flex-col gap-1 `}>
        <div className={`flex justify-between items-center ${contStyle}`}>
            <label htmlFor={field.name} className={`font-semibold ${labelStyle}`}>{label}</label>
            {isRequired && <span>*</span>}
        </div>

        {/* Default Input */}
        { !textArea && type !== 'select' &&
        <div className='flex'>
        <motion.input {...field} type={type} id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
        ref={inputRef}
         onFocus={() => setInputFocused(true)} 
         onBlur={()=>setInputFocused(false)}
         animate={{
          x: (errorMsg && isBtnClicked) ? [null, -5, 5, -3, 3, 0] : 0, // Vibration effect
        }} 
        className=
        {`border border-r-0 border-dark w-[14vw] rounded-l-[0.3rem]  px-2 leading-7 
        ${isInputFocused && ' outline-none border-inputOnFocus '}
        ${initialClick && errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'} 
        ${inputStyle}`}/> 

        <motion.div 
        tabIndex="0"
        onClick={handleDivClick} 
        onBlur={() => setInputFocused(false)}
        animate={{
          x: (errorMsg && isBtnClicked) ? [null, -5, 5, -3, 3, 0] : 0,
        }}
        className=
        {`h-8 cursor-text bg-light flex items-center border border-l-0 border-dark rounded-r-[0.3rem] w-5
        ${isInputFocused && 'outline-none border-inputOnFocus'}
        ${initialClick && errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'}
        `}>
          {( initialClick && errorMsg ) && 
          <>
            <MdErrorOutline className={`error-msg-${errorId} mr-1 text-red-600 cursor-pointer outline-none`}/>
            <Tooltip anchorSelect={`.error-msg-${errorId}`}  place="top" variant="error">
              {errorMsg}
            </Tooltip>
          </>
          }
          
        </motion.div>
        </div>
        }

        {/* Select */}
        { !textArea && type === 'select' &&
        <Select
        {...field}
        isSearchable
        name={field.name}
        id={field.name}
        options={options}
        value={options.find((option) => option.value === field.value)} 
        onChange={(selectedOption) => {
            field.onChange(selectedOption.value);
            setFieldValue(field.name,selectedOption.value)
          }}
      />}
        
      {/* Text Area */}
      {textArea && 
      <textarea  {...field}  id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
      className={`outline outline-1 rounded-[0.3rem] px-1 leading-7 ${inputStyle}`} />}

    </div>
  )}



  Input.propTypes = {
    field: PropTypes.object,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    type:PropTypes.string,
    inputStyle:PropTypes.string,
    labelStyle:PropTypes.string,
    contStyle:PropTypes.string,
    placeholder:PropTypes.string,
    textArea:PropTypes.bool,
    options:PropTypes.array,
    setFieldValue:PropTypes.func,
    isBtnClicked:PropTypes.bool,
    errorId:PropTypes.string,
    errorMsg:PropTypes.string,
  }



 