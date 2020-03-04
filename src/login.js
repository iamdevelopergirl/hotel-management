import React from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

function Login(){
    return (
        <div className="login-container">
            <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <input type="email" className="input-wrap" placeholder="Email"></input>
            </div>
            <div className="input-container">
                <FontAwesomeIcon icon={faKey} className="icon"/>
                <input type="password" className="input-wrap" placeholder="Password"></input>
            </div>
            <div className="submit-login">
                <button className="signin">Sign In</button>
            </div>
            <div className="privacy-footer">
            </div>
        </div>
    )
}
export default Login;