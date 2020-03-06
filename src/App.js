import React from 'react';
import bg from './images/bg-img.jpg';
import './styles/App.css';
import Header from './Header.js';
import Main from './Main.js';
import Login from './login.js';
import HotelInfo from './hotelInfo';
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
    <div className="App">
      <div className="App">{state.isAuthenticated ? <Login/> : <Main emailId={state.user}/>}</div>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
