import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";

const Navbar = () => {

    const {userInfo} = useAppSelector((state) => state.auth)

    return (
        <nav>
            {userInfo
                ? <NavLink to="/dashboard">Dashboard</NavLink>
                : <NavLink to="/">Home</NavLink>
            }
        </nav>
    );
};

export default Navbar;