import axios from 'axios';
import {isNil} from './utils.js';
const loginAPI = `/login`;
const loggedInUserAttribute = "authenticatedUser";

/**
* @class AuthenticationService
* @desc Class to manage the authentication
*/
class AuthenticationService {
    
    /**
    * @private 
    * @function createBasicAuthToken
    * @desc Function to create a basic auth token
    * @param {String} username 
    * @param {String} password
    * @returns {String} basic auth token
    */
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(`${username}:${password}`)
    }

    /**
    * @function executeBasicAuthenticationService
    * @desc Function to call the login api call
    * @param {String} username 
    * @param {String} password
    * @returns {Promise} resolve with status 200 otherwise reject with 404 status
    */
    async executeBasicAuthenticationService(username, password){
        return await axios.get(loginAPI, {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            }
        })
    }

    /**
    * @function registerSuccessfulLogin
    * @desc Function to save the token and create a interceptor for config
    * @param {String} username 
    * @param {String} password
    */
    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(loggedInUserAttribute, username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    /**
    * @private 
    * @function setUpAxiosInterceptors
    * @desc Function to intercept all axios call and add authorization header config
    * @param {String} token
    */
    setUpAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

    /**
    * @function getLoggedInUser
    * @desc Function to get the user name
    * @returns {String} username
    */
    getLoggedInUser(){
        return sessionStorage.getItem(loggedInUserAttribute);
    }
    
    /**
    * @function isUserLoggedIn
    * @desc Function to check whether the user is logged in or not
    * @returns {Boolean} true if logged in, false otherwise
    */
    isUserLoggedIn(){
        const user = sessionStorage.getItem(loggedInUserAttribute);
        if(isNil(user)){
            return false;
        }
        return true;
    }

    /**
    * @function clearSessionStorage
    * @desc Function to clear the session storage during logout
    */
    clearSessionStorage(){
        sessionStorage.clear();
    }
}

export default new AuthenticationService()