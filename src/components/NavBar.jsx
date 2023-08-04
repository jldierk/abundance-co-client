import React from "react";
import CartIcon from "../assets/cart.svg"

class NavBar extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-content">
                    <div className="navbar-item">Abundance Logo</div>
                    <div className="navbar-item" style={{flex: 1}}></div>
                    <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                        <img src={CartIcon}/>
                        <div>Cart</div>                        
                    </div>
                    <div className="navbar-item">
                        <button className="button">Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;