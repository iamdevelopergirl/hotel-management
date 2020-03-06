import React from "react";
import './styles/hotelInfo.css';
import {Settings} from './shared.js';

export default class HotelList extends React.Component{
    constructor(props){
        super(props);

        this.optionsList = [
            {id:"Edit",name:"Edit"},
            {id:"Delete",name:"Delete"}
          ];
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
        this.props.performAction("Edit", this.props.itemKey);
    }

    _callDelete(){
        this.props.performAction("Delete", this.props.itemKey); 
    }

    render(){
        return(
            <div className="list-cell">
                <div className="list-cell-content">
                    <div className="list-logo-container hotel-list margin-left-2">
                        <p>
                            {this.props.item.name.substr(0,2)}
                         </p>
                    </div>
                    <div className="list-item-detail margin-left-20">
                        <div className="list-hotelname">{this.props.item.name}</div>
                    </div>
                    <div className="list-settings margin-left-20">
                        <Settings position="below" optionsList={this.optionsList} handleOptionsClick={this._handleOptionsClick.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}
