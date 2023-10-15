import React from "react";
import ProductForm from "../components/ProductForm";
import LoginForm from "../components/LoginForm";

export default function Admin(props) {
    var user = props.user;
    var isAdmin = user && user.userType == "ADMIN";

    return (
        <div className="main-content">        
            {isAdmin && <ProductForm/>}
            {!isAdmin && <LoginForm setUserCallback={props.setUserCallback}/>}
        </div>
    )
}