import PropTypes from 'prop-types';
import { useState } from "react";
import { MdCheckBoxOutlineBlank , MdCheckBox , MdDeleteOutline } from "react-icons/md"
import { BiMinus } from "react-icons/bi"
import { BsPlus } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

const CartItems = ({productName, productType, sellingPrice}) => {
  const [checked, setChecked] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1); 


  const handleChange = () => {
    setChecked(!checked);
  };

  const setProductCount = (count) => {
    if(count > 0){
      setOrderQuantity(count)
    }
  }

  return (
    <>  
      <div className="flex bg-light rounded-xl h-28 select-none">
        <div onClick={handleChange} className='block w-5 h-5 relative'>
          {checked? <MdCheckBox className="w-5 h-5 absolute left-1 top-1"/> : <MdCheckBoxOutlineBlank className="w-5 h-5 absolute left-1 top-1"/>}
        </div>
        <div className="flex px-2 py-4 h-1/9 content-center w-3/12">
          <img src={"/src/pages/Cart/Assets/pic1.png"} alt="shoe pic" className="object-cover content-center" />
        </div>
        <div className="flex justify-items-start items-center ml-2 w-1/5">
          <div className="text-center">
            <p className="text-lg font-semibold">{productName}</p>
            <p className="text-xs ml-2 font-nunito">{productType}</p>
          </div>
        </div>
        <div className="flex flex-row w-1/5 mr-4 justify-items-end justify-end items-center">
          <div className='text-center font-black'>
            {"$".concat(sellingPrice)}
          </div>
        </div>
        <div className="w-1/12 justify-center flex items-center">
          <div className="inline-block content-center">
            <div className="flex flex-col text-center w-6 items-center">
              <span className="inline-block cursor-pointer text-white bg-black" onClick={() => setProductCount(orderQuantity+1)}>
                <BsPlus />
              </span>
              <span>{orderQuantity}</span>
              <span className="inline-block cursor-pointer text-black bg-gray-200" onClick={() => setProductCount(orderQuantity-1)}>
                <BiMinus />
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-end w-1/4'>
          <AiOutlineHeart className="relative right-2 top-2" />
          <MdDeleteOutline className="relative right-2 top-2 ml-1" />
        </div>
      </div>
    </>
  )
}

CartItems.propTypes = {
  productName:PropTypes.string,
  productType:PropTypes.string,
  sellingPrice:PropTypes.string
};


export default CartItems;