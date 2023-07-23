import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import Register from "./pages/user/Register";
import Products from "./pages/product/collection/Product"
import NewProduct from "./pages/product/newProduct/NewProduct";
function App() {
  const Root=()=>{
    return(
        <>
          <div>
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
      </Route>
    ))
  
  return(
    <RouterProvider router={router}/>
  )
}

export default App
