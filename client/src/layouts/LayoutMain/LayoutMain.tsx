import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header";
import classes from "./LayoutMain.module.css";

const LayoutMain = () => {

    return (
        <>
            <Header />
            <main className={classes.main}>
                <Outlet />
            </main>
        </>
    );
};

export default LayoutMain;