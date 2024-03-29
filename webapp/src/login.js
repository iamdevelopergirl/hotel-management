import React from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "./App";
import AuthenticationService from './authentication-service.js';
import {isNil} from './utils.js';

/**
* @function Login
* @desc Component for login view and authentication
*/
function Login(){
    const { dispatch } = React.useContext(AuthContext);
    
    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };

    const [data, setData] = React.useState(initialState);
    
    /**
    * @private 
    * @function handleInputChange
    * @desc Handle the input change on username and password field
    * @param {Event} event object
    */
    const handleInputChange = event => {
        setData({
        ...data,
        [event.target.name]: event.target.value
        });
    };

    /**
    * @private 
    * @function handleOnSubmit
    * @desc Handle the form submit
    * @param {Event} event object
    */
    const handleOnSubmit = async event => {
        event.preventDefault();
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null
        });

        let res = await AuthenticationService.executeBasicAuthenticationService(data.username, data.password)
        if(!isNil(res.status) && res.status == 200){
          AuthenticationService.registerSuccessfulLogin(data.username, data.password);
          dispatch({
            type: "LOGIN",
            payload: {
              username : data.username
            }
          });
        }
        else{
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: "Could not validate credentials"
          });
        }
      };

    return (
      <div className="App-header">
        <form onSubmit={handleOnSubmit}>
        <div className="login-container">
            <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <input type="text" name="username" className="input-wrap" placeholder="Username" value={data.username}
                onChange={handleInputChange}></input>
            </div>
            <div className="input-container">
                <FontAwesomeIcon icon={faKey} className="icon"/>
                <input type="password" name="password" className="input-wrap" placeholder="Password" value={data.password}
                onChange={handleInputChange}></input>
            </div>
            <div className="submit-login">
                <button type="submit" disabled={data.isSubmitting} className="signin">{data.isSubmitting ? ("Loading") : (`Login`)}
                {isNil(data.errorMessage) ? "" : data.errorMessage}
                </button>
            </div>
            <div className="privacy-footer">
            </div>
        </div>
        </form>
      </div>
    )
}
export default Login;