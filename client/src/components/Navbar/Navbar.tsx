import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";

const Navbar = () => {

    const {userToken} = useAppSelector((state) => state.auth)

    return (
        <nav>
            {userToken
                ?
                    <>
                        <NavLink to="/workspace">Workspace</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                    </>
                :  <NavLink to="/">Home</NavLink>
            }
        </nav>
    );
};

export default Navbar;