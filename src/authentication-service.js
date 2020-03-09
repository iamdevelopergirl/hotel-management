import axios from 'axios';
import {isNil} from './utils.js';
const USER = "test";
const loginAPI = `/login`;
const loggedInUserAttribute = "authenticatedUser";

class AuthenticationService{
    
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(`${username}:${password}`)
    }

    executeBasicAuthenticationService(username, password){
        return axios.get(loginAPI, {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            }
        })
    }

    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(loggedInUserAttribute, username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

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

    getLoggedInUser(){
        return sessionStorage.getItem(loggedInUserAttribute);
    }
    
    isUserLoggedIn(){
        const user = sessionStorage.getItem(loggedInUserAttribute);
        if(isNil(user)){
            return false;
        }
        return true;
    }

    clearSessionStorage(){
        sessionStorage.clear();
    }
}

export default new AuthenticationService()