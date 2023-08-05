import React, { useEffect, useState } from "react";

const LoginButton = (props) => {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [user, setUser] = useState(null);

    var updateUser = props.updateUser;
  
    useEffect(() => {
      let uri = BACKEND_BASE_URL + "/api/v1/users"
      fetch(uri, {credentials: 'include'})
        .then(response => response.json())
        .then(json => {
            setUser(json)
            updateUser(json)
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <button className="button">Log In</button>
    )
}

export default LoginButton;