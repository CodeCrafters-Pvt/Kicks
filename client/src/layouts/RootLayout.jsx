import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Footer } from "../components";

export default function RootLayout() {
  return (
    <div className="font-general">
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
}
