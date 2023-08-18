import { useState , useEffect} from "react";
import axios from "axios";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    const fetchCartProductsPromise = () => {
        return new Promise((resolve, reject) => { 
            axios.get('http://localhost:3001/cart/get-all-cart-products')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
            }
        );
    };
    
    fetchCartProductsPromise()
        .then(data => { setCartProducts(data); console.log(cartProducts);})
        .catch(error => { console.log(error); });
    

    // useEffect(() => {
    //     fetchCartProductsPromise();
    // },[])
    
    return (
        <>  
            <h1>Hello</h1>
            <ul>
                {cartProducts.map((item) =>  <li> {item.sizes} </li> )}
            </ul>
        </>
    )
}

export default Cart;