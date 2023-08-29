import {Toaster} from 'react-hot-toast';
import {Outlet} from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="font-general">
            <Toaster/>
            <Outlet/>
    </div>
  )
}
