import PropTypes from 'prop-types';

export default function Input({field,label,isRequired,type,placeholder,contStyle,inputStyle,labelStyle}) {
  return (
    <div className={`mx-2 my-2 flex flex-col gap-1 `}>
        <div className={`${contStyle}`}>
            <label htmlFor={field.name} className={`font-semibold ${labelStyle}`}>{label}</label>
            {isRequired && <span>*</span>}
        </div>
        <input {...field} type={type} id={field.name} placeholder={`${placeholder ?`Enter ${placeholder}`:''}`}
        className={`outline outline-1 rounded-[0.3rem] px-1 leading-7 ${inputStyle}`}/>
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
  }


 