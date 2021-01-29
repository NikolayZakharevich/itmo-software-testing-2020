import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router5";
import browserPlugin from 'router5-plugin-browser'
import {router} from "./components/routes";


router.usePlugin(browserPlugin())

router.start()

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App/>
        </RouterProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
