import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const Layout = (props) => {
    return(
        <>
            <div style={{display:"flex", flexDirection: "column", minHeight: "100vh"}}>
                <NavBar user={props.user} cart={props.cart}/>
                <Outlet/>
                <div className="footer">
                    hand poured in chicago                            
                </div>
            </div>
        </>
    );
};

export default Layout;