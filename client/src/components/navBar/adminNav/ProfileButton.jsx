import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function ProfileButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
    onClick={toggleExpanded} 
    className="border border-black text-sm px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer">
      <span className="font-semibold">Admin</span>
      {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
}
