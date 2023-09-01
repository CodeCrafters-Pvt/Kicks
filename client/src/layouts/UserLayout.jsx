import { NavBar } from "../components"
import {Outlet} from "react-router-dom"

export default function UserLayout() {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}
