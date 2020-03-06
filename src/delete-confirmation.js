import React from 'react';
import './styles/delete-confirmation.css';

export default class DeleteConfirmation extends React.Component{
    constructor(props){
        super(props);
        this._onDeleteClick = this._onDeleteClick.bind(this);
        this._onCancelClick = this._onCancelClick.bind(this);
    }

    _onDeleteClick(){
        let payload = {
            searchKey : this.props.modalKey,
            modalData : {}
        }
        this.props.handleModal(payload);
    }

    _onCancelClick(){
        this.props.handleModal();
    }


    render(){
        return(
            <div className="delete">
                <div className="delete-logo unsure-logo"></div>
                <div className="delete-item-header">Are you sure?</div>
                <div className="delete-item-text">Do you want to delete this item? This cannot be undone.</div>
                <button className="confirm-delete-item" autoFocus onClick={this._onDeleteClick}>
                    Delete Item
                </button>
                <button className="delete-item-cancel-button" onClick={this._onCancelClick}>
                    Cancel
                </button>
            </div>
        )
    }
}