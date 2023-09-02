import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../../assets/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center mr-5">
      <div className="flex items-center gap-14">
        <NavLink to="/">
          <div
            className="bg-gradient-to-r from-primary via-90% via-light 
                  flex items-center w-[13vw] h-[8vh] text-light"
          >
            <img src={Logo} alt="Kicks-Logo" className="w-[6vw] ml-[2vw]" />
          </div>
        </NavLink>

        <nav className="flex  w-[35vw] justify-between font-medium text-md">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Collection</NavLink>
          <NavLink to="/register">About</NavLink>
          <NavLink to="/register">Contact</NavLink>
        </nav>
      </div>

      {/* <SearchBar /> */}

      <div className="flex gap-4 text-2xl">
        <NavLink to="/profile">
          <FaRegHeart />
        </NavLink>
        <NavLink to="/cart">
          <AiOutlineShoppingCart />
        </NavLink>
        <NavLink to="/register">
          <BiUser />
        </NavLink>
      </div>
    </div>
  );
}
