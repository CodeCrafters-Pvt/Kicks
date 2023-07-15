import PropTypes from 'prop-types';

export default function Input({field,label,isRequired,type,className}) {
  return (
    <div className={`mx-2 my-2`}>
        <div className>
            <label htmlFor={field.name} className={``}>{label}</label>
            {isRequired && <span>*</span>}
        </div>
        <input {...field} type={type} id={field.name} className={`outline outline-1 rounded-sm`}/>
    </div>
  )}

  Input.propTypes = {
    field: PropTypes.object,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    type:PropTypes.string,
    className:PropTypes.string,
  }
