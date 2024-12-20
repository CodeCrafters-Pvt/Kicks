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
  LandingPage,
  Cart,
  Checkout,
} from "./pages";
import { RequireAuth, PersistLogin } from "./components";
import { RootLayout, AuthLayout, UserLayout } from "./layouts";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/landing-page" element={<LandingPage />} />
        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Authorized Routes */}
        <Route element={<PersistLogin />}>
          {/* User Routes */}
          <Route element={<RequireAuth allowedRoles={["2001"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/check-out" element={<Checkout />} />
              <Route path="/" />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<>Missing</>} />
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
