import React from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "./App";
import AuthenticationService from './authentication-service.js';

function Login(){
    const { dispatch } = React.useContext(AuthContext);
    
    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };

    const [data, setData] = React.useState(initialState);
    const handleInputChange = event => {
        setData({
        ...data,
        [event.target.name]: event.target.value
        });
    };

    const handleOnSubmit = event => {
        event.preventDefault();
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null
        });

        AuthenticationService.executeBasicAuthenticationService(data.username, data.password)
        .then(()=> {
          AuthenticationService.registerSuccessfulLogin(data.username, data.password);
          dispatch({
            type: "LOGIN",
            payload: {
              username : data.username
            }
          });
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText
          });
        })
      };

    return (
      <div className="App-header">
        <div className="login-container">
            <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <input type="text" className="input-wrap" placeholder="Username" value={data.username}
                onChange={handleInputChange}></input>
            </div>
            <div className="input-container">
                <FontAwesomeIcon icon={faKey} className="icon"/>
                <input type="password" className="input-wrap" placeholder="Password" value={data.password}
                onChange={handleInputChange}></input>
            </div>
            <div className="submit-login">
                <button disabled={data.isSubmitting} className="signin" onClick={handleOnSubmit}>{data.isSubmitting ? ("Loading") : ("Login")}
                </button>
            </div>
            <div className="privacy-footer">
            </div>
        </div>
      </div>
    )
}
export default Login;