import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Link({ to, element, activeElement }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isElementActive = isActive && activeElement;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      animate={isElementActive ? { y: -3 } : { y: 0 }}
    >
      <NavLink to={to}>
        {activeElement ? (isActive ? activeElement : element) : element}
      </NavLink>
    </motion.div>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  activeElement: PropTypes.element,
};
