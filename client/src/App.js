import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import RegisterUser from '../src/pages/user/register/register'




function App() {
  const Root=()=>{
    return (<div><Outlet/></div>)
  }

  const router=createBrowserRouter(
    createRoutesFromElements( 
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<RegisterUser/>}/>
      </Route>
    ))
  
  return (
            <RouterProvider router={router}/>
  );
}

export default App;
