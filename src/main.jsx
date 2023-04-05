import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/shop/Shop';
import Home from './components/Layout/Home';
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './Loaders/CartProductsLoader';
import CheckOut from './components/checkOut/CheckOut';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
      },
      {
        path: 'orders',
        element:<Order></Order>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element:<Inventory></Inventory>
      },
      {
        path:'login',
        element: <Login></Login>
      },
      {
        path:'checkout',
        element: <CheckOut></CheckOut>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
