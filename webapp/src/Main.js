import React, { useState } from 'react';
import HotelInfo from './hotel-info.js'
import { AuthContext } from "./App";
import './styles/Login.css';
import axios from 'axios';
import {Spinner} from './spinner.js';
import { ErrorOccurred } from './error-occurred';
import {isNil} from './utils.js'

const initialState = {
    hotelItems: [],
    isFetching: false,
    hasError: false,
};

export const reducer = (state, action) => {
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


/**
* @function Main
* @desc Component for decide between login and main page
*/
export const Main = ({emailId}) => {
    const { state: authState, dispatch : authDispatch } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [updateCount, setUpdateCount] = useState(0);
    const [uploading, setUploading] = useState(false);

    
    React.useEffect(() => {
        dispatch({
          type: "FETCH_ITEMS_REQUEST"
        });

        axios.get("/api/hotels")
          .then(resJson => {
            let newHotelItems = []
            if(resJson.data.length !== 0){
              resJson.data.map((item) => {
                let itemId = item.id;
                let newObj = { [itemId] : item}
                newHotelItems.push(newObj);
              });
            }
            dispatch({
              type: "FETCH_ITEMS_SUCCESS",
              payload: newHotelItems
            });
          })
          .catch(error => {
            dispatch({
              type: "FETCH_ITEMS_FAILURE"
            });
          });
      }, [updateCount]);

    const indexOfLastItem = currentPage * itemsPerPage; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = state.hotelItems.length !== 0 ? state.hotelItems.slice(indexOfFirstItem, indexOfLastItem) : [];

    /**
    * @private 
    * @function paginate
    * @desc Function to set the current page
    */
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    /**
    * @private 
    * @function updateItems
    * @desc Function to tell the reducer to 
    */
    const updateItems = () => {
      let newUpdateCount = updateCount + 1;
      setUpdateCount(newUpdateCount)
    }

    /**
    * @private 
    * @function logout
    * @desc Function to call the logout api
    */
    const logout = async () => {
      return await axios.get("/logout");
    }

    /**
    * @private 
    * @function onLogoutClicked
    * @desc Function to act according to logout api
    */
    const onLogoutClicked = async () => {
      let res = await logout();
      if(!isNil(res.status) && res.status === 200){
        authDispatch({
          type: "LOGOUT"
        });
      }
    }

    return (
        <div>
            {state.isFetching ? ( <Spinner/> ) : state.hasError ? ( <ErrorOccurred/> ) : 
            ( <div> 
              <HotelInfo hotelItems={currentItem} emailId={emailId} updateItems={updateItems} token={authState.token} uploading={uploading} itemsPerPage={itemsPerPage} totalItems={state.hotelItems.length} paginate={paginate} onLogoutClicked={onLogoutClicked}/> 
             </div> )}
        </div>
    )
}

export default Main;