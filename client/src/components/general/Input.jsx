import { useEffect, useState,useRef } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip'
import { MdErrorOutline } from 'react-icons/md'
import { motion } from 'framer-motion';
import { CirclePicker } from 'react-color'

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
  showError,
  errorId,
  errorMsg,
  paletteWidth,
  colorSize,
}) 
{
  const inputRef = useRef(null)
  const [isInputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [initialClick, setInitialClick] = useState(false);

  const animation={
    x: (errorMsg && isBtnClicked) ? [null, -5, 5, -3, 3, 0] : 0,
  }

  var borderColor="#1b1b1b"
  if(errorMsg && initialClick){
     borderColor="red"
  }
  else if(isInputFocused || isHovered){
     borderColor="#c7c6eb"
  }
  else{
     borderColor="#1b1b1b"
  }

  const selectStyle = {
    control: (base) => ({
      ...base,
      width:(showError?"14vw":"100%"),
      boxShadow: "none", 
      borderColor: borderColor,
      borderRight:showError && 0,
      borderRadius:(showError?"0.3rem 0 0 0.3rem":"0.3rem"),
    })
  };

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
            {textArea && 
              ( initialClick && errorMsg ) &&
              <motion.div animate={animation}>
                <MdErrorOutline className={`error-msg-${errorId}  text-red-600 cursor-pointer outline-none mr-1 `}/>
                <Tooltip anchorSelect={`.error-msg-${errorId}`}  place="top" variant="error">
                  {errorMsg}
                </Tooltip>
              </motion.div>
            }
            {isRequired && <span>*</span>}
        </div>

        {/* Default Input */}
        { !textArea && type !== 'select' && type !== 'color' &&
        <div className='flex'>
        <motion.input {...field} type={type} id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
         ref={inputRef}
        min={type==="number" && 0}
         onFocus={() => setInputFocused(true)} 
         onBlur={()=>setInputFocused(false)}
         onMouseEnter={()=>setIsHovered(true)}
         onMouseLeave={()=>setIsHovered(false)}
         animate={animation} 
        className=
        {`border border-r-0 border-dark w-[14vw] rounded-l-[0.3rem]  px-2 leading-7
        ${isHovered && 'border-inputOnFocus'}
        ${isInputFocused && ' outline-none border-inputOnFocus '}
        ${initialClick && errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'} 
        ${inputStyle}`}/> 

        <motion.div 
        tabIndex="-1"
        onClick={handleDivClick} 
        onBlur={() => setInputFocused(false)}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        animate={animation}
        className=
        {`h-8 cursor-text bg-light flex items-center border border-l-0 border-dark rounded-r-[0.3rem] w-5 
        ${isHovered && 'border-inputOnFocus'}
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
        <motion.div
        className={`${showError && 'flex'}`}
        animate={animation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        >
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
        styles={selectStyle}
      />
     {showError && <div
        onClick={handleDivClick} 
        onBlur={() => setInputFocused(false)}
        className=
        {`h-9.5 cursor-text bg-light flex items-center  border border-l-0 border-dark rounded-r-[0.3rem] w-5
        ${isHovered && 'border-inputOnFocus'}
        ${isInputFocused && 'outline-none border-inputOnFocus'}
        ${initialClick && errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'}
         `}
      >
      {( initialClick && errorMsg ) &&
      <>
        <MdErrorOutline className={`error-msg-${errorId}  text-red-600 cursor-pointer outline-none `}/>
        <Tooltip anchorSelect={`.error-msg-${errorId}`}  place="top" variant="error">
          {errorMsg}
        </Tooltip>
      </>}
      </div>}
      </motion.div>}



        
      {/* Text Area */}
      {textArea && 
        <motion.textarea  {...field}  id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
        className={
          `outline w-full outline-1 rounded-[0.3rem] px-1 leading-7 resize-none ${inputStyle}
          ${initialClick && errorMsg && ' outline-red-500 focus:outline-red-500 focus:ring-red-500'}`
          } 
        animate={animation}    
          />
      }

      {/* color selector */}
      {!textArea && type === 'color' &&
        <motion.div
        className={`${errorMsg && 'border border-red-500'} px-2 py-1 rounded-[0.3rem]`}
        animate={animation}
        style={{ width: paletteWidth ? paletteWidth : '100%' }}
        >
          <CirclePicker colors={options} circleSize={colorSize} width={paletteWidth}/>
        </motion.div>
      }


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
    showError:PropTypes.bool,
    errorId:PropTypes.string,
    errorMsg:PropTypes.string,
    paletteWidth:PropTypes.string,  
    colorSize:PropTypes.number,  
  }



 