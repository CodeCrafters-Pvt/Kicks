import PropTypes from 'prop-types';
import { motion } from "framer-motion"

export default function Button({text,type,className,onClick}) {
    return(
        <motion.button  type={type || "submit"} onClick={onClick} 
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
  }