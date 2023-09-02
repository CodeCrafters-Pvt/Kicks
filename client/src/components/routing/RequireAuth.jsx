import { useLocation,Navigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import PropTypes from 'prop-types';



const RequireAuth=({allowedRoles})=>{
    const user = useSelector(selectCurrentUser)
    console.log(user)
    const location = useLocation()

    return (
        user?.role?.find((role)=>allowedRoles?.includes(role))
        ? <Outlet/>
        : user 
            ?   <>Unauthorized</>
            :   <Navigate to="/login" state={{from:location}} replace/> 
    )
}

export default RequireAuth;

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array,
  }