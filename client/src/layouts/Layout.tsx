import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header";
import BoardMenu from "../components/BoardMenu/BoardMenu";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import classes from "./Layout.module.css";

const Layout = () => {

    const [isBoardMenu, setIsBoardMenu] = useState<boolean>(false);

    const handleMenuClick = () => {
        setIsBoardMenu(!isBoardMenu)
    }

    return (
        <div>
            <Header handleMenuClick={handleMenuClick} isBoardMenu={isBoardMenu}/>
            <main className={classes.main}>
                <Outlet />
                {isBoardMenu && <PrivateRoute Component={BoardMenu} />}
            </main>
        </div>
    );
};

export default Layout;