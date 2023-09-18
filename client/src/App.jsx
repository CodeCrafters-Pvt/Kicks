import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  RegisterUser,
  Login,
  ResetPassword,
  ForgotPassword,
  Profile,
} from "./pages";
import { RequireAuth } from "./components";
import { RootLayout, AuthLayout, UserLayout } from "./layouts";
import { RegisterUser,Login,ResetPassword,ForgotPassword,Profile,Cart } from "./pages";
import { RequireAuth } from "./components"
import { RootLayout,AuthLayout, UserLayout } from "./layouts"


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Authorized Routes */}

        {/* User Routes */}
        <Route element={<RequireAuth allowedRoles={["2001"]}/>}>
          <Route element={<UserLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" />
          </Route>
        </Route>
        <Route path="*" element={<>Missing</>} />
        <Route element={<RequireAuth allowedRoles={['2001']}/>}>
          <Route element={<UserLayout/>}>
            <Route path="/profile"  element={<Profile />} />
          </Route>
        </Route>    
        <Route path="/cart" element={<Cart/>}/>  
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
