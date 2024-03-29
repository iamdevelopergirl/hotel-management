import React from 'react';
import './styles/App.css';
import Main from './Main.js';
import Login from './login.js';
import AuthenticationService from './authentication-service.js';
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};


/**
* @function App
* @desc App component that routes the login page or main page
*/
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  if(AuthenticationService.isUserLoggedIn()){
    state.user = AuthenticationService.getLoggedInUser();
    state.isAuthenticated = true; 
  }
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
      <div className="App">
        <div className="App">{!state.isAuthenticated ? <Login/> : <Main emailId={state.user}/>}</div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
