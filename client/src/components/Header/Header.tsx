import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Navbar from "../Navbar/Navbar";
import {logout} from "../../store/slices/authSlice";
import {Button} from "antd";
import classes from "./Header.module.css";

interface IHeaderProps {
    onClick: (value: boolean) => void;
    isBoardMenu: boolean;
}

const Header: React.FC<IHeaderProps> = ({onClick, isBoardMenu}) => {

    const {userToken} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    return (
        <header className={classes.header}>
            {userToken && <Button  className={classes.buttonLogout} onClick={() => dispatch(logout())}>Logout</Button>}
            <Navbar/>
            <Button className={classes.buttonMenu} onClick={() => onClick(false)}>{isBoardMenu ? 'Close' : 'Menu'}</Button>
        </header>
    );
};

export default Header;