import {Outlet, Navigate} from 'react-router-dom';

const PrivateRoutes = () => {

    let token = localStorage.getItem('token');

    return(
        token !== null ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes