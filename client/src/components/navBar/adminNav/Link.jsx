import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Link({ to, Icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div
      className={`cursor-pointer font-semibold rounded-md py-2 border border-transparent hover:border-primary
      ${isActive && "bg-primary text-white"}
      `}
    >
      <NavLink to={to}>
        <div className="flex items-center px-4">
          <Icon className="mr-4" />
          <span className="flex-grow">{text}</span>
        </div>
      </NavLink>
    </div>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};
