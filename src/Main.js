import React, { useState } from 'react';
import HotelInfo from './hotelInfo'
import { AuthContext } from "./App";
import logo from './images/hotel-img.jpeg';
import './styles/Login.css';
import Pagination from './pagination.js';

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
    const [itemsPerPage] = useState(4);
    const [updateCount, setUpdateCount] = useState(0);

    React.useEffect(() => {
        dispatch({
          type: "FETCH_ITEMS_REQUEST"
        });

        fetch("https://jsonplaceholder.typicode.com/posts", {
          // headers: {
          //   Authorization: `Bearer ${authState.token}`
          // }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw res;
            }
          })
          .then(resJson => {
            const mockItems = 
    [{"1" : { "name" : "elakya1" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"2" : { "name" : "elakya2" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"3" : { "name" : "elakya3" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"4" : { "name" : "elakya4" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"5" : { "name" : "elakya5" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"6" : { "name" : "elakya6" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"7" : { "name" : "elakya7" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"8" : { "name" : "elakya8" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"9" : { "name" : "elakya9" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"10" : { "name" : "elakya10" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"11" : { "name" : "elakya11" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"12" : { "name" : "elakya12" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}},
     {"13" : { "name" : "elakya13" , "title" : "elakya", "city" : "tirupur", "state" : "tamilnadu", "image": logo}}
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
            {state.isFetching ? ( <span className="App-header">LOADING...</span> ) : state.hasError ? ( <span className="App-header">AN ERROR HAS OCCURED</span> ) : 
            ( <div> 
              <HotelInfo hotelItems={currentItem} emailId={emailId} updateItems={updateItems}/>
              <Pagination itemsPerPage={itemsPerPage} totalItems={state.hotelItems.length} paginate={paginate}/> 
             </div> )}
        </div>
    )
}

export default Main;