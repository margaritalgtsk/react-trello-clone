import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Navbar from "../Navbar/Navbar";
import {logout} from "../../store/slices/authSlice";
import {Button} from "antd";
import classes from "./Header.module.css";

interface IHeaderProps {
    handleMenuClick: (value: boolean) => void;
    isBoardMenu: boolean;
}

const Header: React.FC<IHeaderProps> = ({handleMenuClick, isBoardMenu}) => {

    const {userToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    return (
        <header className={classes.header}>
            {userToken &&
                <Button className={classes.buttonLogout} onClick={() => {
                        dispatch(logout());
                        handleMenuClick(false);
                    }
                }>
                    Logout
                </Button>}
            <Navbar/>
            {userToken && <Button className={classes.buttonMenu} onClick={() => handleMenuClick(false)}>{isBoardMenu ? 'Close' : 'Menu'}</Button>}
        </header>
    );
};

export default Header;