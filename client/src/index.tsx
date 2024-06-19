import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './store';
import {Provider} from 'react-redux';
import {persistStore} from "redux-persist";
import {PersistGate} from 'redux-persist/integration/react';
import './index.css';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);