import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "./Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Workspace from "./Workspace/Workspace";
import LayoutBoard from "../layouts/LayoutBoard";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home/>} />
                    <Route path="/workspace" element={<PrivateRoute Component={Workspace} />} />
                    <Route path="/board/" element={<PrivateRoute Component={LayoutBoard} />} />
                    <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;