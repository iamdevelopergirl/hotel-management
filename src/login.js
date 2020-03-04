import React from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "./App";

function Login(){
    const { dispatch } = React.useContext(AuthContext);
    const initialState = {
        email: "",
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
        fetch("https://hookedbe.herokuapp.com/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: data.email,
            password: data.password
          })
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          })
          .then(resJson => {
            dispatch({
                type: "LOGIN",
                payload: resJson
            })
          })
          .catch(error => {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: error.message || error.statusText
            });
          });
      };

    return (
        <div className="login-container">
            <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <input type="email" className="input-wrap" placeholder="Email" value={data.email}
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
    )
}
export default Login;