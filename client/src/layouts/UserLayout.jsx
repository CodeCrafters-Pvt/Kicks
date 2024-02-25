import { NavBar,Footer } from "../components"
import {Outlet} from "react-router-dom"

export default function UserLayout() {
  return (
    <>
      <NavBar/>
      <Outlet/>
    <Footer/>
    </>
  )
}
