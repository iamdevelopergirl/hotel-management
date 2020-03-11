import React from 'react';
import './styles/hotelInfo.css';
import AddEditModal from './add-edit-modal.js';
import DeleteConfirmation from './delete-confirmation.js';

/**
* @class ModalContainer
* @desc Parent container component to display the dialog based on the modal Type
*/
export default class ModalContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let view = null;
        let style = {};
        switch(this.props.toDisplay){
            case "Edit":
                view = <AddEditModal modalKey={this.props.modalKey} modalData={this.props.modalData} handleModal={this.props.handleModal}/>;
                break;
            case "Delete":
                view = <DeleteConfirmation modalKey={this.props.modalKey} handleModal={this.props.handleModal}/>
                style = {'height': 719};
                break;
        }
        return(
            <div>
                <div className="grey-overlay grey-overlay--short-modal"></div>
                <div id="modal-container" style={style}>
                    {view}
                </div>
            </div>
        )
    }
}