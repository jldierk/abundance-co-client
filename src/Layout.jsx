import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const Layout = () => {
    return(
        <>
            <div style={{display:"flex", flexDirection: "column", minHeight: "100vh"}}>
                <NavBar/>
                <Outlet/>
                <div className="footer">
                    hand poured in chicago                            
                </div>
            </div>
        </>
    );
};

export default Layout;