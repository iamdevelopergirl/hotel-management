import axios from 'axios';
import {isNil} from '../utils.js';
import AuthenticationService from '../authentication-service.js';
jest.mock('axios');

it("should return correct auth token when calling createBasicAuthToken", ()=>{
    spyOn(window, "btoa").and.returnValue("testBtoa")
    expect(AuthenticationService.createBasicAuthToken("test", "test")).toEqual("Basic testBtoa"); 
});

it("should resolve with correct data when axios call succeeds", async ()=>{
    const data = {
        status : 200
    }
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(AuthenticationService.executeBasicAuthenticationService("user", "pass")).resolves.toEqual(data);
});

it("should reject with error message data when axios call fails", async ()=>{
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("Netwrok error")));
    await expect(AuthenticationService.executeBasicAuthenticationService("user", "pass")).rejects.toThrow("Netwrok error");
});

it("should call setUpAxiosInterceptors when registersuccessful call is accessed", ()=>{
    spyOn(AuthenticationService, "setUpAxiosInterceptors");
    let jestFn = spyOn(global.sessionStorage, "setItem");
    AuthenticationService.registerSuccessfulLogin();
    expect(AuthenticationService.setUpAxiosInterceptors).toHaveBeenCalled();
    //expect(jestFn).toHaveBeenCalled();
});

it("should return true when the session storage has the authenticated user value", ()=>{
    spyOn(global.sessionStorage, "getItem").and.returnValue("user");
    expect(AuthenticationService.isUserLoggedIn).toBeTruthy();
});

it("should call axios interceptors for every call", () => {
    axios.interceptors.request.use.mockImplementationOnce(() => {
        return {
            authorization : "token"
        }
    });
    AuthenticationService.setUpAxiosInterceptors();
    expect(axios.interceptors.request.use).toHaveBeenCalled();
});
