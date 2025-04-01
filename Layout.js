import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
);

export default Layout;