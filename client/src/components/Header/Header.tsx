import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Navbar from "../Navbar/Navbar";
import {Button} from "antd";
import classes from "./Header.module.css";
import {logout} from "../../store/slices/authSlice";

const Header = () => {

    const {userToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    return (
        <header className={classes.header}>
            <Navbar/>
            {userToken && <Button  className={classes.buttonLogout} onClick={() => dispatch(logout())}>Logout</Button>}
        </header>
    );
};

export default Header;