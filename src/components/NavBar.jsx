import React, { useEffect, useState } from "react";
import CartIcon from "../assets/cart.svg"
import AbundanceLogo from "../assets/abundanceLogo.svg"
import AbundanceSolo from "../assets/abundance-solo.svg"
import LoginButton from "./LoginButton";

const NavBar = (props) => {
    var cart = props.cart;
    var user = props.user;
  
    var cartCount = 0;
    if (cart && cart.orderItems) {
        let orderItemArr = cart.orderItems;
        for (var i = 0; i < orderItemArr.length; i++) {
            var orderItem = orderItemArr[i];
            cartCount += (orderItem && orderItem.quantity) ? orderItem.quantity : 0;
        }
    }

    return (
        <div className="nav-bar">
            <div className="nav-content">
                <div className="navbar-item" style={{flex: 1}}>
                    <a href="/"><img style={{width:"300px", height:"100px"}} src={AbundanceSolo}/></a>
                </div>
                {/* <div className="navbar-item" style={{flex: 1, justifyContent: "center", textAlign: "center"}}></div> */}
                <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "right"}}>                    
                    <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                        <a href="/#/cart">
                            <div style={{display:"flex", alignItems: "center"}}>
                                <img src={CartIcon}/>
                                <div><span>Cart</span><span className="bubble-text">{cartCount}</span></div>
                            </div>
                        </a>
                    </div>
                    {
                        user && user.userType == "ADMIN" &&    
                        <div className="navbar-item">
                            <a href="/#/admin"><button className="button btn-primary-colors">Admin Console</button></a>
                        </div>
                    }
                
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