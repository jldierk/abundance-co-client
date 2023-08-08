import React, { useEffect, useState } from "react";
import CartIcon from "../assets/cart.svg"
import AbundanceLogo from "../assets/abundanceLogo.svg"
import LoginButton from "./LoginButton";

const NavBar = (props) => {
    var user = props.user;
    var cart = props.cart;
  
    var cartCount = 0;
    if (cart) {
        cartCount = cart.orderItems ? cart.orderItems.length : 0;
    }

    return (
        <div className="nav-bar">
            <div className="nav-content">
                <div className="navbar-item" style={{flex: 1}}></div>
                <div className="navbar-item" style={{flex: 1, justifyContent: "center", textAlign: "center"}}>
                    <a href="/"><img style={{width:"300px", height:"100px"}} src={AbundanceLogo}/></a>
                </div>
                <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "right"}}>                    
                    <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                        <a href="/cart">
                            <div style={{display:"flex", alignItems: "center"}}>
                                <img src={CartIcon}/>
                                <div><span>Cart</span><span className="bubble-text">{cartCount}</span></div>
                            </div>
                        </a>
                    </div>
                    <div className="navbar-item">
                        <a href="/admin"><button className="button btn-primary-colors">Admin Console</button></a>
                    </div>
                
                    {/* We're not going to allow users to login, people can just check in as guests
                     <div className="navbar-item">
                        <LoginButton user={user}/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;