import React from 'react';
import './styles/hotelInfo.css';
import AddEditModal from './add-edit-modal.js';

export default class ModalContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let view = null;
        switch(this.props.toDisplay){
            case "Edit":
                view = <AddEditModal />;
                break;
        }
        return(
            <div>
                <div className="grey-overlay grey-overlay--short-modal"></div>
                <div id="modal-container">
                    {view}
                </div>
            </div>
        )
    }
}