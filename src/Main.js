import React, { useState } from 'react';
import HotelInfo from './hotelInfo'
import { AuthContext } from "./App";
import logo from './images/hotel-img.jpeg';
import './styles/Login.css';
import Pagination from './pagination.js';
import axios from 'axios';
import {HotelAPI} from './utils.js';
import {Spinner} from './spinner.js';

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
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [updateCount, setUpdateCount] = useState(0);
    const [uploading, setUploading] = useState(false);

    const {
      url,
      headers,
      param
    } = HotelAPI(authState.token);

    React.useEffect(() => {
        dispatch({
          type: "FETCH_ITEMS_REQUEST"
        });

        axios.get("/hotels", {
          // headers: {
          //   Authorization: `Bearer ${authState.token}`
          // }
        })
          .then(resJson => {
            console.log(resJson);
            const mockItems = 
    [{"1" : { "name" : "elakya1" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"2" : { "name" : "elakya2" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"3" : { "name" : "elakya3" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"4" : { "name" : "elakya4" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"5" : { "name" : "elakya5" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"6" : { "name" : "elakya6" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"7" : { "name" : "elakya7" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"8" : { "name" : "elakya8" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"9" : { "name" : "elakya9" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"10" : { "name" : "elakya10" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"11" : { "name" : "elakya11" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"12" : { "name" : "elakya12" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}},
     {"13" : { "name" : "elakya13" , "phoneNumber" : 12312321, "city" : "tirupur",  "image": logo}}
    ];
            dispatch({
              type: "FETCH_ITEMS_SUCCESS",
              payload: mockItems
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
    const currentItem = state.hotelItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    const updateItems = () => {
      let newUpdateCount = updateCount + 1;
      setUpdateCount(newUpdateCount)
    }

    return (
        <div>
            {state.isFetching ? ( <Spinner/> ) : state.hasError ? ( <span className="App-header">AN ERROR HAS OCCURED</span> ) : 
            ( <div> 
              <HotelInfo hotelItems={currentItem} emailId={emailId} updateItems={updateItems} token={authState.token} uploading={uploading} itemsPerPage={itemsPerPage} totalItems={state.hotelItems.length} paginate={paginate}/> 
             </div> )}
        </div>
    )
}

export default Main;