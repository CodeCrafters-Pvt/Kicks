import React, { useState } from "react";
import MensWear from "../../assets/mens_wear.png";
import WomensWear from "../../assets/womens_wear.png";
import KidsWear from "../../assets/kids_wear.png";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export default function DesignCategories() {
  const Card = ({ img, text, to, className, displayText }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        className="relative w-1/3 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute inset-0 bg-black h-[90%] ${
            isHovered ? "opacity-50" : "opacity-0"
          } transition-opacity`}
        ></div>
        <img src={img} className="w-full h-[90%]" alt={text}></img>
        <h2
          className={`absolute top-0 right-0 mt-10 mr-10 font-heading text-2xl text-primary ${className} ${
            isHovered ? "hidden" : ""
          }`}
        >
          {displayText}
        </h2>
        <Link to={to}>
        <div
            className={`absolute top-1/2 left-48 ${
              isHovered ? "hover:border-primary hover:border-4 p-1 rounded-xl": ""
            }`}
          >
            <Button
              text="Browse ->"
              variant="primary-invert"
              
              className="text-xl"
            />
          </div></Link>
        
      </div>
    );
  };
  return (
    <div className="flex w-full ">
      <Card img={MensWear} text="MEN'S WEAR" displayText={<>MEN'S WEAR</>} to="/"/>
      <Card
        img={WomensWear}
        text={`WOMEN'S WEAR`}
        displayText={
          <>
            WOMEN'S <br /> WEAR
          </>
        }
        className="!text-black top-56"
        to="/"
      />
      <Card
        img={KidsWear}
        text="KID'S WEAR"
        displayText={
          <>
            KID'S <br />
            WEAR
          </>
        }
        className=" top-20"
        to="/"
      />
    </div>
  );
}
