import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import Register from "./pages/user/Register";


function App() {
  const Root=()=>{
    return(
        <>
          <div className="font-general">
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
