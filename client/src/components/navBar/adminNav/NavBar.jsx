import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdSpaceDashboard } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { PiPackageFill } from "react-icons/pi";
import { motion } from "framer-motion";
import logo from "../../../assets/adminLogo.png";
import Link from "./Link";
import ProfileButton from "./ProfileButton";
import Notifications from "./Notifications";
import Search from "./Search";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="w-[100vw] h-[8vh]  shadow-lg flex justify-between ">
        <button
          onClick={toggleNavBar}
          className="border-2 rounded-md m-2 px-1 text-2xl"
        >
          {isOpen ? <ImCross /> : <TiThMenu />}
        </button>
        <div className="mr-4 flex items-center gap-10">
          <Search />
          <Notifications />
          <ProfileButton />
        </div>
      </div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="bg-white h-[100vh] w-[15%] shadow-lg fixed"
      >
        <img src={logo} alt="kicks" className="w-1/2 mx-auto mt-8" />

        <div className="mt-16 mx-auto w-4/5 flex flex-col gap-6 ">
          <Link to="/admin" Icon={MdSpaceDashboard} text="DASHBOARD" />
          <Link to="/add-product" Icon={GiConverseShoe} text="PRODUCTS" />
          <Link to="/" Icon={PiPackageFill} text="ORDERS" />
        </div>
      </motion.div>
    </div>
  );
}
