import PropTypes from 'prop-types';
import Loading from "../Components/Loading/Loading";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [ user, loading ] = useAuth();
    const [ isAdmin, isAdminLoading ] = useAdmin();
    const location = useLocation()
     if( loading || isAdminLoading ) {
         return <Loading/>
     }
     if ( user && isAdmin ) {
         return children
     }  
     return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node
};
export default AdminRoute;