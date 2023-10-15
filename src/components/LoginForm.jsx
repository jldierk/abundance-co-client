import React, { useState } from "react";

const LoginForm = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    function login() {
        var userCredentials = {
            email : userName,
            password : password
        };

        const requestOptions = {    
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userCredentials)
          };
          let url = BACKEND_BASE_URL + '/api/v1/users/login';
          fetch(url, requestOptions)
            .then(response=>response.json())
            .then(data=> {
              console.log("Attempted Login For User: " + userName);
              if (data.userId) {
                props.setUserCallback(data);
              } else {
                setErrorMessage("Invalid login. Please check your credentials and try again.");
              }            
            })
            .catch(err => {
                console.log("Error " + err)
            });
    }

    return (        
        <div>
            {errorMessage && <div className="warning">{errorMessage}</div>}
            <div className="input-wrapper">
                <span className="label">Username : </span>
                <span><input className="admin-input" type="text" id="userName" name="userName" value={userName} onChange={(e) => {setUserName(e.target.value)}}/></span>
            </div>
            <div className="input-wrapper">
                <span className="label">Password : </span>
                <span><input className="admin-input" type="text" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/></span>
            </div>
            <button className="button btn-black-white" style={{marginTop: "15px", marginBottom: "15px"}} onClick={login.bind(this)}>Login</button>
        </div>
    )
}

export default LoginForm;