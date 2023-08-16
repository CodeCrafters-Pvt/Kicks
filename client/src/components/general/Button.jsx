import PropTypes from 'prop-types';
import { motion } from "framer-motion"

export default function Button({text,type,className,onClick,onBlur,onMouseDown,onMouseUp}) {
    return(
        <motion.button  type={type || "submit"} onClick={onClick} onBlur={onBlur} onMouseDown={onMouseDown} onMouseUp={onMouseUp}
        className={`outline outline-1 p-2  bg-dark text-light rounded-[0.3rem] 
        hover:bg-slate-700
        ${className}`} >
            {text}
        </motion.button> 
    )
}

Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
  }