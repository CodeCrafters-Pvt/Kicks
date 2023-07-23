import PropTypes from 'prop-types';

export default function Button({text,type,className,onClick}) {
    return(
        <button type={type} onClick={onClick} 
        className={`outline outline-1 p-2  bg-dark text-light rounded-[0.3rem] ${className}`} >
            {text}
        </button> 
    )
}

Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }