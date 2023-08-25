import { useSelector } from 'react-redux';
import { useLocation,Navigate,Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';



const RequireAuth=({allowedRoles})=>{
    const user = useSelector(state => state.auth.user);
    const location=useLocation()

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