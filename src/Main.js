import React, { useState } from 'react';
import HotelInfo from './hotel-info.js'
import { AuthContext } from "./App";
import logo from './images/hotel-img.jpeg';
import './styles/Login.css';
import Pagination from './pagination.js';
import axios from 'axios';
import {HotelAPI} from './utils.js';
import {Spinner} from './spinner.js';
import { ErrorOccurred } from './error-occurred';

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


export const Main = ({emailId}) => {
    const { state: authState, dispatch : authDispatch } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [updateCount, setUpdateCount] = useState(0);
    const [uploading, setUploading] = useState(false);

    
    React.useEffect(() => {
        dispatch({
          type: "FETCH_ITEMS_REQUEST"
        });

        axios.get("/api/hotels", {
          // headers: {
          //   Authorization: `Bearer ${authState.token}`
          // }
        })
          .then(resJson => {
            console.log(resJson);
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
            console.log(error);
            dispatch({
              type: "FETCH_ITEMS_FAILURE"
            });
          });
      }, [updateCount]);

    const indexOfLastItem = currentPage * itemsPerPage; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = state.hotelItems.length!== 0 ? state.hotelItems.slice(indexOfFirstItem, indexOfLastItem) : 0;

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    const updateItems = () => {
      let newUpdateCount = updateCount + 1;
      setUpdateCount(newUpdateCount)
    }

    const onLogoutClicked = () => {
      axios.get("/logout")
      .then(() => {
        console.log("Logged out");
      })
      authDispatch({
        type: "LOGOUT"
      });
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