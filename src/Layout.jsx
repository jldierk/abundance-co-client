import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const Layout = (props) => {
    return(
        <>
            <div style={{display:"flex", flexDirection: "column", minHeight: "100vh"}}>
                <NavBar user={props.user} cart={props.cart}/>
                <Outlet/>
                <Footer/>
            </div>
        </>
    );
};

export default Layout;