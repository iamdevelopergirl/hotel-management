import React from 'react';
import './styles/popup.css';

function Popup(props){
    
    const handleOnClick = event => { 

    }

    return(
        <div className="base-popup">
          <div className="triangle-with-shadow"></div>
            <div className="content-wrapper" onClick={handleOnClick}>
              <div className="top-status-left"></div>
              <div className="top-status-center"></div>
              <div className="top-status-right"></div>
              {props.children}
            </div>
        </div>
    )
}
export default Popup;