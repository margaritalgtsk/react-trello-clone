import React from 'react';
import {useAppSelector} from "../../store/hooks";
import {Navigate} from "react-router-dom";

interface IPrivateRouteProps {
    Component: any;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ Component }) => {

    const {userInfo} = useAppSelector((state) => state.auth)

    return userInfo ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;