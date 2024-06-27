import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LayoutMain from "../layouts/LayoutMain/LayoutMain";
import Home from "./Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Workspace from "./Workspace/Workspace";
import LayoutBoard from "../layouts/LayoutBoard/LayoutBoard";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<Home/>} />
                    <Route path="/workspace" element={<PrivateRoute Component={Workspace} />} />
                    <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route path="/board/" element={<PrivateRoute Component={LayoutBoard} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;