import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutScreen from './page/layout/LayoutScreen';
import HomeContainer from './page/home/HomeContainer';
import { createRoot } from "react-dom/client";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutScreen />,
    children: [
      { path: "/", element: <HomeContainer /> },
      // { path: "/owner", element: <Owner /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);