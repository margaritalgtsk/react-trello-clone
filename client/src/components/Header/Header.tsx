import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Navbar from "../Navbar/Navbar";
import {logout} from "../../store/slices/authSlice";
import {Button} from "antd";
import classes from "./Header.module.css";

const Header = () => {

    const {userToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    return (
        <header className={classes.header}>
            {userToken &&
                <Button className={classes.buttonLogout} onClick={() => dispatch(logout())}>
                    Logout
                </Button>}
            <Navbar/>
        </header>
    );
};

export default Header;