import React from "react";
import Adidas from "../../assets/brands/adidas.png";


const Icon = ({ img, imgName }) => {
  return (
    <div className=" flex items-center my-4 w-1/5">
      <img src={img} alt={name} className=" py-2 px-4 my-4 mx-4" />
    </div>
  );
};

const data = [
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
  { img: Adidas, name: "adidas" },
]

export default function Brands() {
  return (
    <div className="text-center h-full">
      <div className="py-4 text-4xl mt-8 mx-4">Brands We Stock</div>
      <p className=" pt-8">
        We pick the very best so you can be assured of the quality. There can be
        no compromises when it comes to materials, ease of wear, and durability.
      </p>
      <div className=" flex flex-wrap ml-20 mr-20">
        {data.map((d) => (
          <Icon key={d.name} img={d.img} imgName={d.imgName} />
        ))}
      </div>
    </div>
  );
}
