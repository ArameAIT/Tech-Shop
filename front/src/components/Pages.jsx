import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import HomePage from './HomePage.jsx';
import App from '../App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                path: '',
                element: <App />,
                
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

function Pages() {
    return <RouterProvider router={router} />;
}

export default Pages;
