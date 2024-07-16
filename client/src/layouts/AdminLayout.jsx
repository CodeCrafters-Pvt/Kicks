import { AdminNavBar } from "../components";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="bg-background min-h-screen">
      <AdminNavBar />
      <Outlet />
    </div>
  );
}
