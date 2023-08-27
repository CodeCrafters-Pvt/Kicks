import { useState , useEffect} from "react";
import axios from "axios";
import CartItems from "./cart-items";
import { Link } from "react-router-dom";
import { BiSolidSelectMultiple, BiChevronLeft } from "react-icons/bi"

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
      const fetchCartProducts = async () => {
        try {
          await axios.get('http://localhost:3001/cart/get-all-cart-products')
          .then((response) => {
            setCartProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCartProducts();
    }, []);
    
    console.log(cartProducts);
    return (
      <>  
        <div className="container flex bg-gray-200 justify-center text-textNormal">
          <div className="w-3/4 py-4">
            <Link to="/">
              <div className="flex items-center font-extrabold text-lg ">
                <div className="text-xl">
                  <BiChevronLeft />
                </div>
                <div>
                  Shopping Continue
                </div>
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
            <div>
              <div className="my-2 w-1/2 block">
                {/* Block of list */}
                <div>
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
              <div>
                {/* order summary */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Cart;