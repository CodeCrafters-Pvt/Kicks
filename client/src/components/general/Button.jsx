import PropTypes from 'prop-types';
import { motion } from "framer-motion"

export default function Button({
    text,
    type,
    variant,
    className,
    onClick,
    onBlur,
    onMouseDown,
    onMouseUp,
    disabled}) {
    return(
        <motion.button  
        type={type || "submit"}
        disabled={disabled} 
        onClick={onClick} 
        onBlur={onBlur} 
        onMouseDown={onMouseDown} 
        onMouseUp={onMouseUp}
        className={`
        outline outline-1 p-2 rounded-[0.3rem] hover:brightness-125 text-light cursor-pointer
        ${(!variant || variant==="plain" || (variant!=="dark" && variant!=="positive" && variant!=="danger" && variant!=="primary") ) &&
         '!bg-light !text-dark hover:!brightness-100 '}
        ${variant==="primary" && '!bg-primary'}
        ${variant==="dark" && '!bg-dark'}
        ${variant==="primary-invert" && '!bg-white !outline-white hover:!brightness-105 !text-primary'}
        ${variant==="positive" && '!bg-green-500 !outline-green-500 hover:!brightness-105'}
        ${variant==="danger" && '!bg-red-500 !outline-red-500'}
        
        ${className}`} >
            {text}
        </motion.button> 
    )
}

Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    variant:PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    disabled:PropTypes.bool
  }