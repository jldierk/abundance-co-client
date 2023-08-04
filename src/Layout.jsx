import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const Layout = () => {
    return(
        <>
            <NavBar/>
            <div className="main-content">                
                <Outlet/>
            </div>
            <div className="footer">
                hand poured in chicago                            
            </div>
        </>
    );
};

export default Layout;