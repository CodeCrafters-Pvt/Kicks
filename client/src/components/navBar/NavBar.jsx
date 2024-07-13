import { NavLink } from "react-router-dom";
import Link from "./Link";
import SearchBar from "./SearchBar";
import { ProfileButton } from "../";
import Logo from "../../assets/logo.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCart, BsCartFill } from "react-icons/bs";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavBar() {
  const [showProfileTab, setShowProfileTab] = useState(false);
  return (
    <div className="flex justify-between items-center mr-5 mb-4">
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
          <Link to="/" element="Home" />
          <Link to="/profile" element="Collection" />
          <Link to="/login" element="Login" />
          <Link to="/register" element="Contact" />
        </nav>
      </div>

      {/* <SearchBar /> */}

      <div className="flex gap-4 text-2xl">
        <Link
          to="/profile"
          element={<AiOutlineHeart />}
          activeElement={<AiFillHeart />}
        />
        <Link
          to="/register"
          element={<BsCart />}
          activeElement={<BsCartFill />}
        />
        <div className="relative">
          <motion.div whileHover={{ y: -3 }}>
            {showProfileTab ? (
              <HiUser
                className="cursor-pointer"
                onClick={() => setShowProfileTab(false)}
              />
            ) : (
              <HiOutlineUser
                className="cursor-pointer"
                onClick={() => setShowProfileTab(true)}
              />
            )}
          </motion.div>
          {showProfileTab && <ProfileButton />}
        </div>
      </div>
    </div>
  );
}
