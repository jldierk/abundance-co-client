import React from "react";
import instagramLogo from "../assets/instagram.svg"

const Footer = (props) => {
    return (
        <div className="footer">
            <div style={{display:"flex", justifyContent: "space-around"}}>
                <div>
                    <h3>Follow On Socials</h3>
                    <a href="https://www.instagram.com/abundance_candle_co/" target="_blank"><img src={instagramLogo}/></a>
                </div>
                <div>
                    <h3>Help</h3>
                </div>
            </div>
        </div>

    )
}

export default Footer;