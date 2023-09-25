import {Toaster} from 'react-hot-toast';
import {Outlet} from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton';

export default function RootLayout() {
  return (
    <div className="font-general">
            <Toaster/>
            <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
              <Outlet/>
            </SkeletonTheme>
    </div>
  )
}
