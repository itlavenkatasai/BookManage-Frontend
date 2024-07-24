import React from "react";
import  ReactDOM  from "react-dom/client";
import DisplayInfo from "./components/DisplayInfo";
import Register from "./components/Register";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import SignIn from "./components/SignIn";
import { Link } from "react-router-dom";

const AppLayOut = ()=>{
  return (
    <div>

      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayOut />,
    children:[
      {
        path:'/',
        element:<SignIn />
      },
      {
        path:'/login',
        element:<SignIn />
      },
      {
        path:'/register',
        element:<Register />
      },
      {
        path:'/bookmanage',
        element:<DisplayInfo />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);