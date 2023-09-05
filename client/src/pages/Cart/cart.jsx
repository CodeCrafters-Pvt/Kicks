import { useState , useEffect} from "react";
import axios from "axios";
import CartItems from "../../components/cart/cart-items";
import { Link } from "react-router-dom";
import { BiSolidSelectMultiple, BiChevronLeft } from "react-icons/bi"
import { useGetCartProductsQuery } from "../../redux/api/cartApiSlice";

const Cart = () => {
  const {isLoading,isError,error,data:cartProducts} = useGetCartProductsQuery()
  console.log(cartProducts)
  console.log(typeof(cartProducts))

  return (
    <>  
      <div className="container flex bg-gray-200 justify-center text-textNormal">
        <div className="w-3/4 py-4">
          <Link to="/" className="inline-block">
            <div className="flex items-center font-extrabold text-lg">
              <BiChevronLeft className="text-xl"/>
              <span> Shopping Continue </span>
            </div>
          </Link>
          {/* Horizontal line */}
          <hr className="border-t-2 border-gray-300 my-3 w-1/3"></hr>
          <div className="flex font-light text-lg">
            {/* shopping cart and selectall button */}
            <div className="text-base">
              Shopping cart
            </div>
            <div className="ml-2 text-lg">
              <BiSolidSelectMultiple />
            </div>
          </div>
          <small className="text-xs font-extralight">
              You have {cartProducts.length} item in your cart
          </small>
          <div className="grid grid-flow-col grid-cols-12 gap-x-3 ">
            <div className="my-2 col-span-6">
              {/* Block of list */}
              <div className="grid grid-flow-row gap-y-3">
                {/* list */}
                {
                  cartProducts.map((cartProduct) => 
                    <CartItems 
                      key={cartProduct._id}
                      productName={cartProduct.productName}
                      productType={cartProduct.category}
                      sellingPrice={cartProduct.sellingPrice}
                    />
                  )
                }
              </div>
            </div>
            <div className="flex col-start-8 col-end-12 h-90 bg-slate-800 rounded-2xl">
              {/* order summary */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;