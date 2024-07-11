import { NavBar, Footer } from "../components";
import { Outlet } from "react-router-dom";
import "../index.css";

export default function UserLayout() {
  return (
    <div className=" bg-background min-h-screen">
      <NavBar />
      <Outlet />
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}
