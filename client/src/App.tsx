import React from 'react';
import {ConfigProvider} from "antd";
import AppRouter from "./components/AppRouter";
import Error from "./components/Error";
import './App.css';

function App() {

    return (
        <div className="App">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#489992',
                    },
                    components: {
                        Button: {
                            primaryShadow: "none"
                        }
                    }
                }}
            >
                <AppRouter />
                <Error />
            </ConfigProvider>
      </div>
    );
}

export default App;