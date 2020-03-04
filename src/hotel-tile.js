import React from 'react';
import './styles/hotelInfo.css';
import {Settings} from './shared.js';

export default class HotelTile extends React.Component{
    constructor(props){
        super(props);

        this.optionsList = [
            {id:"Edit", name : "Edit"},
            {id:"Delete",name : "Delete"}
        ];
    }

    _handleContainerClick(){
        this._handleOptionsClick("Edit");
    }

    _handleOptionsClick(option){
        this._handleAction(option);
    }

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

    _callEdit(){
        this.props.performAction(this.props.item.id, "Edit");
    }

    _callDelete(){
        this.props.performAction(this.props.item.id, "Delete"); 
    }

    render(){
        let hotelItemClass = "hotel-tile";
        if((this.props.itemIndex+1) % 4 === 0) {
            hotelItemClass = hotelItemClass + " no-right-margin";
        }

        return(
            <div className={hotelItemClass} id={this.props.item.id}>
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