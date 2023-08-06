import React, { useEffect, useState } from "react";

const LoginButton = (props) => {
    var user = props.user;
    if (user && user.userType == "GUEST") {
        return (
            <button className="button btn-primary-colors">Log In</button>
        )
    } else {
        return (<div>I got nothin'</div>)
    }
}

export default LoginButton;