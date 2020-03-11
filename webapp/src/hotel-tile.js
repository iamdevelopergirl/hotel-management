import React from 'react';
import './styles/hotelInfo.css';
import {Settings} from './shared.js';

/**
* @class HotelTile
* @desc Component to show the tile view of hotel items
*/
export default class HotelTile extends React.Component{
    constructor(props){
        super(props);

        this.optionsList = [
            {id:"Edit", name : "Edit"},
            {id:"Delete",name : "Delete"}
        ];
    }

    /**
    * @private 
    * @function _handleOptionsClick
    * @desc Handle the container click to show edit modal
    */
    _handleContainerClick(){
        this._handleOptionsClick("Edit");
    }

    /**
    * @private 
    * @function _handleOptionsClick
    * @desc Handle the options click
    * @param {String} option Edit or Delete
    */
    _handleOptionsClick(option){
        this._handleAction(option);
    }

    /**
    * @private 
    * @function _handleAction
    * @desc Handle the options click
    * @param {String} option Edit or Delete
    */
    _handleAction(option) {
        switch(option) {
          case "Edit":
            this._callEdit();
            break;
          case "Delete":
            this._callDelete();
            break;
        }
    }

    /**
    * @private 
    * @function _callEdit
    * @desc Handle the Edit click
    */
    _callEdit(){
        this.props.performAction("Edit", this.props.itemKey);
    }

    /**
    * @private 
    * @function _callDelete
    * @desc Handle the Delete click
    */
    _callDelete(){
        this.props.performAction("Delete", this.props.itemKey); 
    }

    render(){
        let hotelItemClass = "hotel-tile";
        if((this.props.itemIndex+1) % 4 === 0) {
            hotelItemClass = hotelItemClass + " no-right-margin";
        }

        return(
            <div className={hotelItemClass} id={this.props.itemKey}>
                <div className="tile-container" onClick={this._handleContainerClick.bind(this)}>
                    <div className="logo-container">
                        <img src={this.props.item.image} className="tile-icon"></img>
                    </div>
                    <div className="hotelname_container">
                        <div className="hotelname">{this.props.item.name}</div>
                        <div className="tile-settings" onClick={this.props.stopPropagation}>
                            <Settings tileView position="above" optionsList={this.optionsList} handleOptionsClick={this._handleOptionsClick.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}