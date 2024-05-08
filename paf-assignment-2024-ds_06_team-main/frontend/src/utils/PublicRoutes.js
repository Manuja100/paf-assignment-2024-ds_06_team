import {Outlet, Navigate} from 'react-router-dom';

const PublicRoutes = () => {

    let token = localStorage.getItem('token');

    return(
        token === null ? <Outlet/> : <Navigate to="/feed"/>
    )
}

export default PublicRoutes;