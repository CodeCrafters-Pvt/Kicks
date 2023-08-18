import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import { store } from "./store";
import {Provider} from 'react-redux'
import {RegisterUser,Login} from "./pages";
import Profile from "./pages/user/Profile"


import Products from "./pages/product/collection/Product"
import NewProduct from "./pages/product/newProduct/NewProduct";
import Cart from "./pages/Cart/cart";

function App() {
  const Root=()=>{
    return(
        <>
          <div className="font-general">
            <Toaster/>
            <Outlet/>
          </div>
        </>
    )}

  const router=createBrowserRouter(
    createRoutesFromElements( 
      <Route path="/" element={<Root/>}>
      <Route path="/" element={<Register/>}/>
      <Route path="/product" element={<Products/>}/>
      <Route path="/newproduct" element={<NewProduct/>}/>
      <Route path="/cart" element={<Cart/>}/>
          <Route path="/" element={<RegisterUser/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/ss" element={<Profile/>}/>
          <Route path="/product" element={<Products/>}/>
          <Route path="/newproduct" element={<NewProduct/>}/>
      </Route>
    ))
  
  return(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
