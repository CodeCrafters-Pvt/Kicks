import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from "./store";
import {RegisterUser,Login,ResetPassword,ForgotPassword,Profile} from "./pages";
import {RequireAuth} from "./components"
import {RootLayout,AuthLayout} from "./layouts"

import Cart from "./pages/Cart/cart";

function App() {

  const router=createBrowserRouter(
    createRoutesFromElements( 
      <Route path="/" element={<RootLayout/>}>
        <Route  element={<AuthLayout/>}>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/reset-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="/profile"  element={<Profile />} />
        </Route>    
        <Route path="*" element={<>Missing</>} />     
      <Route path="/" element={<Root/>}>
          
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
