import React from 'react';
import HotelInfo from './hotelInfo'
import { AuthContext } from "./App";

const initialState = {
    hotelItems: [],
    isFetching: false,
    hasError: false,
};

const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_ITEMS_REQUEST":
        return {
          ...state,
          isFetching: true,
          hasError: false
        };
      case "FETCH_ITEMS_SUCCESS":
        return {
          ...state,
          isFetching: false,
          hotelItems: action.payload
        };
      case "FETCH_ITEMS_FAILURE":
        return {
          ...state,
          hasError: true,
          isFetching: false
        };
      default:
        return state;
    }
};

export const Main = (props) => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({
          type: "FETCH_ITEMS_REQUEST"
        });

        fetch("https://hookedbe.herokuapp.com/api/songs", {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw res;
            }
          })
          .then(resJson => {
            console.log(resJson);
            dispatch({
              type: "FETCH_ITEMS_SUCCESS",
              payload: resJson
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: "FETCH_ITEMS_FAILURE"
            });
          });
      }, [authState.token]);

    return (
        <div>
            {state.isFetching ? ( <span className="loader">LOADING...</span> ) : state.hasError ? ( <span className="error">AN ERROR HAS OCCURED</span> ) : <HotelInfo hotelItems={state.hotelItems} emailId={props.user}/> }
        </div>
    )
}

export default Main;