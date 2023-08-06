import React, { useEffect, useState } from "react";
import CartIcon from "../assets/cart.svg"
import LoginButton from "./LoginButton";

const NavBar = (props) => {
    var user = props.user;
    var cart = props.cart;
  
    var cartCount = 0;
    if (cart) {
        cartCount = cart.orderItems ? cart.orderItems.length : "not found";
    }

    return (
        <div className="nav-bar">
            <div className="nav-content">
                <div className="navbar-item" style={{flex: 1}}></div>
                <div className="navbar-item" style={{flex: 1, justifyContent: "center", textAlign: "center"}}><a href="/">Abundance Logo</a></div>
                <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "right"}}>                    
                    <div className="navbar-item">
                        <a href="/admin">Admin Console</a>
                    </div>
                    <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                        <a href="/cart">
                            <div style={{display:"flex", alignItems: "center"}}>
                                <img src={CartIcon}/>
                                <div><span>Cart</span><span className="bubble-text">{cartCount}</span></div>
                            </div>
                        </a>
                    </div>
                    <div className="navbar-item">
                        <LoginButton user={user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;