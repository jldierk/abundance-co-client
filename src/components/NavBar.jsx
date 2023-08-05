import React, { useEffect, useState } from "react";
import CartIcon from "../assets/cart.svg"
import LoginButton from "./LoginButton";

const NavBar = (props) => {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        // only attempt to load our cart if we have a user in scope
        if (user && user.id) {
            let uri = BACKEND_BASE_URL + "/api/v1/orders/cart"
            fetch(uri, {credentials: 'include'})
                .then(response => response.json())
                .then(json => setCart(json))
                .catch(error => console.error(error));
        }      
    }, [user]);

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
                    <div>
                        <a href="/admin">Admin Console</a>
                    </div>
                    <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                        <img src={CartIcon}/>
                        <div>Cart ({cartCount})</div>                        
                    </div>
                    <div className="navbar-item">
                        <LoginButton updateUser={setUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;