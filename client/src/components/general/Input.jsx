import { useState} from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip'
import { MdErrorOutline } from 'react-icons/md'

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
  errorId,
  errorMsg
}) 
  {
  const [isInputFocused, setInputFocused] = useState(false);
  
  return (
    <div className={`mx-2 my-2 flex flex-col gap-1 `}>
        <div className={`flex justify-between items-center ${contStyle}`}>
            <label htmlFor={field.name} className={`font-semibold ${labelStyle}`}>{label}</label>
            {isRequired && <span>*</span>}
        </div>

        {/* Default Input */}
        { !textArea && type !== 'select' &&
        <div className='flex'>
        <input {...field} type={type} id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
         onFocus={() => setInputFocused(true)} 
         onBlur={()=>setInputFocused(false)} 
        className=
        {`border border-r-0 border-dark w-[14vw] rounded-l-[0.3rem]  px-2 leading-7 
        ${isInputFocused && ' outline-none border-inputOnFocus '}
        ${errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'} 
        ${inputStyle}`}/> 

        <div 
        tabIndex="0"
        onClick={() => setInputFocused(true)} 
        onBlur={() => setInputFocused(false)}
        className=
        {`h-8 cursor-text bg-light flex items-center border border-l-0 border-dark rounded-r-[0.3rem] w-5
        ${isInputFocused && 'outline-none border-inputOnFocus'}
        ${errorMsg && 'border-red-500 focus:border-red-500 focus:ring-red-500'}
        `}>
          {( errorMsg && errorMsg!=='' ) && 
          <>
            <MdErrorOutline className={`error-msg-${errorId} mr-1 text-red-600 cursor-pointer outline-none`}/>
            <Tooltip anchorSelect={`.error-msg-${errorId}`}  place="top" variant="error">
              {errorMsg}
            </Tooltip>
          </>
          }
          
        </div>
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
    errorId:PropTypes.string,
    errorMsg:PropTypes.string,
  }



 