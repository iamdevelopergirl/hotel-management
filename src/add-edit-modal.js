import React from 'react';
import './styles/hotelInfo.css';
import {TextInput} from './shared.js';
import { Upload } from '@progress/kendo-react-upload';
import {isNil} from './utils.js';
import './styles/add-edit-modal.css';
import AddressLogo from './images/ic-modal-addresses.svg';

class CustomListItemUI extends React.Component {
    render() {
        const { files } = this.props;

        return (
        <ul>
            {
                files.map(file => <li key={file.name}>{file.name}</li>)
            }
        </ul>);
    }
}

export default class AddEditModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hotelNameError : "",
            cityError : "",
            stateError : "",
            showError : false
        }
        this._onClickSave = this._onClickSave.bind(this);
        this._onClickCancel = this._onClickCancel.bind(this);
    }

    _showErrorMessage() {
        this.setState({showError : true});
    }

    _focusNextField(refName) {
        if(this[refName]) {
          this[refName].setFocus();
        }
    }

    _onClickCancel(){
        this.props.handleModal();
    }

    _onClickSave(){
        let id = this.props.modalKey || "0";
        let addObj = {
            title : this.titleInput.state.values,
            name : this.name.state.values,
            address1 : this.address1Input.state.values,
            address2 : this.address2Input.state.values,
            city : this.cityInput.state.values,
            state : this.stateInput.state.values,
            pincode : this.postalInput.state.values,
        }

        if(this._performValidation(addObj)){
            this._showErrorMessage();
            return;
        }
        let payload = {
            searchKey : id,
            modalData : addObj
        }
        this.props.handleModal(payload);
    }

    _performValidation(addObj) {
        let errorState = false;
        let cityErrorMessage = null;
        let hotelNameErrorMessage = null;
        let stateErrorMessage = null
    
        if(isNil(addObj.name) || addObj.name.trim() === ''  ) {
            hotelNameErrorMessage = "Hotel name cannot be empty";
            errorState = true;
        }
        if(isNil(addObj.city) || addObj.city.trim() === ''  ) {
            cityErrorMessage = "City cannot be empty";
            errorState = true;
        }
        if(isNil(addObj.state) || addObj.state.trim() === ''  ) {
            stateErrorMessage = "State cannot be empty";
            errorState = true;
        }
        
        this.setState({
            hotelNameError : hotelNameErrorMessage,
            cityError : cityErrorMessage,
            stateError : stateErrorMessage
        });
        return errorState;
    }

    render(){
        let tempObj = {};
        if(Object.keys(this.props.modalData).length !== 0){
            tempObj = this.props.modalData;
        }
        return(
            <div className="add-edit-form">
                <div className="form-header">
                    <div className="add-edit-header">
                        <div className="add-edit-gradient"></div>
                        <div className="add-edit-close relative-position"></div>
                        <div className="add-edit-title relative-position" title={tempObj.name}>{tempObj.name}</div>
                        <div className="add-edit-circle relative-position">
                            <img className="item-image" src={AddressLogo}/>
                        </div>
                    </div>
                </div>
                <div className="hotel-form">
                    <div className="row auto-margin">
                        <div className="address-title"><TextInput name="Hotel Title"  ref={(input) => { this.titleInput = input; }} values={tempObj.title} maxLength="25" autofocus onMaxLengthReached={()=>{this._focusNextField('name')}}/></div>
                        <div className="hotel-name"><TextInput name="Hotel Name"  ref={(input) => { this.name = input; }} 
                        values={tempObj.name} maxLength="256" 
                        onMaxLengthReached={()=>{this._focusNextField('address1Input')}}
                        errorMessage={this.state.hotelNameError}/></div>
                    </div>
                    <div className="row auto-margin">
                        <div className="contact-address"><TextInput name="Address Line 1"  ref={(input) => { this.address1Input = input; }} values={tempObj.address1} maxLength="256"  onMaxLengthReached={()=>{this._focusNextField('address2Input')}}/></div>
                        <div className="contact-address"><TextInput name="Address Line 2"  ref={(input) => { this.address2Input = input; }} values={tempObj.address2} maxLength="256" onMaxLengthReached={()=>{this._focusNextField('cityInput')}}/></div>
                    </div>
                    <div className="row auto-margin">
                        <div className="contact-city"><TextInput name="City" maxLength="25" ref={(input) => { this.cityInput = input;}} 
                        values={tempObj.city} 
                        onMaxLengthReached={()=>{this._focusNextField('stateInput')}}
                        errorMessage={this.state.cityError}/></div>
                        <div className="contact-state"><TextInput name= "State" maxLength="25" ref={(input) => { this.stateInput = input;}} 
                        values={tempObj.state} 
                        onMaxLengthReached={()=>{this._focusNextField('postalInput')}}
                        errorMessage={this.state.stateError}/></div>
                    </div>
                    <div className="row auto-margin">
                        <div className="contact-postal"><TextInput name="Postal Code" maxLength="6" ref={(input) => { this.postalInput = input;}} values={tempObj.pincode} onMaxLengthReached={()=>{this._focusNextField('savebutton')}}/></div>
                        
                        <div className="column address-image">
                        <div className="name-container margin-left-3">Upload Photos</div>
                        <Upload batch={true} multiple={true} defaultFiles={[]} withCredentials={false}
                        restrictions={{
                            allowedExtensions: [ '.jpg', '.png' ],
                            maxFileSize: 4000000
                        }} 
                        listItemUI={CustomListItemUI}
                        saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                        removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}/>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button className="save-button hotel-save" onClick={this._onClickSave}>Save</button>
                        <button className="cancel-button hotel-cancel" onClick={this._onClickCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}