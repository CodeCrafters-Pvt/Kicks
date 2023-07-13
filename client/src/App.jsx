import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import Register from "./pages/user/register/components/Register";


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
      </Route>
    ))
  
  return(
    <RouterProvider router={router}/>
  )
}

export default App
