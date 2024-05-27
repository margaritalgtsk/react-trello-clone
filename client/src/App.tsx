import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import Search from "./components/Search/Search";
import Error from "./components/Error";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./layouts/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import './App.css';

function App() {

    return (
        <div className="App">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#0E8777',
                    },
                    components: {
                        Button: {
                            primaryShadow: "none"
                        }
                    }
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home/>} />
                            <Route path="/dashboard" element={<PrivateRoute Component={Search} />} />
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Error />
            </ConfigProvider>
      </div>
    );
}

export default App;