import { useState , useEffect} from "react";
import axios from "axios";
import CartItems from "./cart-items";
import { Link } from "react-router-dom";

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
    
    return (
      <>  
        <div className="container flex bg-gray-200 justify-center text-textNormal">
          <div className="w-3/4 py-4">
            <Link to="/">
              <div className="flex items-center font-extrabold text-sm ">
                <svg 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={1.5} 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg" 
                  aria-hidden="true"
                  className="w-4 h-4 mx-0"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 19.5L8.25 12l7.5-7.5" 
                  />
                </svg>
                <div className="ml-2">
                  Shopping Continue
                </div>
              </div>
            </Link>
            {/* Horizontal line */}
            <hr class="border-t-2 border-gray-300 my-3 w-1/3"></hr>
            <div className="font-semibold text-xs">
              {/* shopping cart and selectall button */}
              <div>
                Shopping cart
              </div>
              <div>

              </div>
              {/* a text telling how many items are selected */}
              <div>

              </div>
            </div>

            <div>
              <div>
                {/* Block of list */}
                <div>
                  {/* list */}
                  <CartItems />
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