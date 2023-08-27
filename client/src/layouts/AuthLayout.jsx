import {Outlet} from "react-router-dom"
import circle from "../assets/Ellipse.webp"
import shoePic from "../assets/register-bg.webp"


export default function AuthLayout() {
  return (
    <div className='flex justify-center items-center h-screen relative bg-userMgtBg'>
    <img src={circle} alt="circle" className='absolute top-5 left-[12%] w-[20%] '/>
    <div className=' bg-light w-[60%] mt-10 h-[75%] z-10 flex'>
    <img src={shoePic} alt="shoe" className=''/>
    <div className='w-1/2 flex flex-col items-center gap-10'>
        <Outlet/>
    </div>
    </div>     
    </div>
  )
}

