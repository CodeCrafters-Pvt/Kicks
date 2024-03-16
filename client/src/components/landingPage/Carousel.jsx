import React from "react";
import Shoes from "../../assets/shoes.png";
import { FaCheckCircle } from "react-icons/fa";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Carousel({slides}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      // navigation
      pagination={{ clickable: true }}
      autoplay={{delay:5000}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className=" h-[92vh] ">
        <div className=" flex mx-20 p-12 h-[95%] items-center">
          <div className=" ml-20">
            <div className=" flex gap-4 mb-6 ml-6">
              <h6 className="flex gap-2 items-center">
                <FaCheckCircle className=" text-blue-600" /> Free Register
              </h6>
              <h6 className="flex gap-2 items-center">
                <FaCheckCircle className=" text-blue-600" />
                Great Service
              </h6>
              <h6 className="flex gap-2 items-center">
                <FaCheckCircle className=" text-blue-600" />
                Easy Payment
              </h6>
            </div>
            <h1 className=" text-dark font-heading text-6xl">
              Getting the best and <br /> latest style has never
            </h1>
            <h1 className=" text-primary font-heading text-6xl">
              been easier!
            </h1>
            <p className=" my-6 text-gray-600">
              <span className=" text-dark font-heading">
                Kicks: FashionForAll{" "}
              </span>
              is a platform that helps to make fashion
              <br />
              accessible to all, it brings fashion to your doorstep!
            </p>
            <button className=" bg-primary hover:bg-primary text-white font-bold py-1 px-2 border border-primary rounded">
              Shop Collections
            </button>
          </div>
          
            <img src={Shoes} className=" mx-20 my-8 w-[25%] h-[60%] object-contain "></img>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}

{/* To be added 

{slides.map((Slide)=>(
  <SwiperSlide><Slide/></SwiperSlide>
))} */}