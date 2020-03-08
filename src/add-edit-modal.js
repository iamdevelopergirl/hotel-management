import React from 'react';
import './styles/hotelInfo.css';
import {TextInput} from './shared.js';
import {isNil, isString} from './utils.js';
import './styles/add-edit-modal.css';
import AddressLogo from './images/ic-modal-addresses.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default class AddEditModal extends React.Component{
    constructor(props){
        super(props);
        this._modalType = "add";
        this.state = {
            hotelNameError : "",
            addressError : "",
            cityError : "",
            phoneNumberError : "",
            imageError : "",
            showError : false,
            selectedFile : this.props.modalData.image
        }
        this._onClickSave = this._onClickSave.bind(this);
        this._onClickCancel = this._onClickCancel.bind(this);
        this._fileSelectHandler = this._fileSelectHandler.bind(this);
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
        const formData = new FormData();
        formData.append("name", this.name.state.values);
        formData.append("address1", this.address1Input.state.values);
        formData.append("address2", this.address2Input.state.values);
        formData.append("city", this.cityInput.state.values);
        formData.append("postalCode", this.postalInput.state.values);
        formData.append("phoneNumber", this.phoneNumberInput.state.values);

        if(!isString(this.state.selectedFile)){
            formData.append("image", this.state.selectedFile);
        }

        let id = this.props.modalKey;
        let addObj = {
            name : this.name.state.values,
            address1 : this.address1Input.state.values,
            city : this.cityInput.state.values,
            phoneNumber : this.phoneNumberInput.state.values,
            image : this.state.selectedFile
        }

        if(this._performValidation(addObj)){
            this._showErrorMessage();
            return;
        }
        let payload = {
            searchKey : id,
            modalData : formData
        }
        this.props.handleModal(payload);
    }

    _performValidation(addObj) {
        let errorState = false;
        let cityErrorMessage = "";
        let hotelNameErrorMessage = "";
        let addressErrorMessage = "";
        let phoneNumberErrorMessage = "";
        let imageErrorMessage = "";
    
        if(isNil(addObj.name) || addObj.name.trim() === ''  ) {
            hotelNameErrorMessage = "Hotel name cannot be empty";
            errorState = true;
        }
        if(isNil(addObj.address1) || addObj.address1.trim() === ''  ) {
            addressErrorMessage = "Address cannot be empty";
            errorState = true;
        }
        if(isNil(addObj.city) || addObj.city.trim() === ''  ) {
            cityErrorMessage = "City cannot be empty";
            errorState = true;
        }
        if(!isNil(addObj.phoneNumber)){
            if(isNaN(addObj.phoneNumber)){
                phoneNumberErrorMessage = "Phone Number should be in numbers";
                errorState = true;
            }
        }
        if(isNil(addObj.image)){
            imageErrorMessage = "Please upload atleast one image";
            errorState = true;
        }
        
        this.setState({
            hotelNameError : hotelNameErrorMessage,
            cityError : cityErrorMessage,
            addressError  : addressErrorMessage,
            phoneNumberError : phoneNumberErrorMessage,
            imageError : imageErrorMessage
        });
        return errorState;
    }

    _fileSelectHandler(event){
        console.log(event.target.files[0]);
        this.setState({
            selectedFile : event.target.files[0]
        });
    }

    render(){
        let tempObj = {};
        if(Object.keys(this.props.modalData).length !== 0){
            tempObj = this.props.modalData;
            this._modalType = "edit";
        }
        return(
            <div className="add-edit-form">
                <div className="form-header">
                    <div className="add-edit-header">
                        <div className="add-edit-gradient"></div>
                        <div className="add-edit-close relative-position"></div>
                        <div className="add-edit-title relative-position" title={isNil(tempObj.name) ? "" : tempObj.name}>{isNil(tempObj.name) ? "" : tempObj.name}</div>
                        <div className="add-edit-circle relative-position">
                            <img className="item-image" src={AddressLogo}/>
                        </div>
                    </div>
                </div>
                <div className="hotel-form">
                    <div className="row auto-margin">
                        <div className="hotel-name">
                            <TextInput name="Hotel Name *"  
                            autofocus 
                            ref={(input) => { this.name = input; }} 
                            values={isNil(tempObj.name) ? "" : tempObj.name} 
                            maxLength="256" 
                            onMaxLengthReached={()=>{this._focusNextField('phoneNumberInput')}}
                            errorMessage={this.state.hotelNameError}/>
                        </div>
                        <div className="address-title">
                            <TextInput name="Phone Number"  
                            ref={(input) => { this.phoneNumberInput = input; }} 
                            values={isNil(tempObj.phoneNumber) ? "" : tempObj.phoneNumber} 
                            maxLength="10" 
                            onMaxLengthReached={()=>{this._focusNextField('address1Input')}}
                            errorMessage={this.state.phoneNumberError}/>
                        </div>
                    </div>
                    <div className="row auto-margin">
                        <div className="contact-address">
                            <TextInput name="Address Line 1 *"  
                            ref={(input) => { this.address1Input = input; }} 
                            values={isNil(tempObj.address1) ? "" : tempObj.address1} maxLength="256"  
                            onMaxLengthReached={()=>{this._focusNextField('address2Input')}}
                            errorMessage={this.state.addressError}/>
                        </div>
                        <div className="contact-address">
                            <TextInput name="Address Line 2"  
                            ref={(input) => { this.address2Input = input; }} 
                            values={isNil(tempObj.address2) ? "" : tempObj.address2} 
                            maxLength="256" 
                            onMaxLengthReached={()=>{this._focusNextField('cityInput')}}/>
                        </div>
                    </div>
                    <div className="row auto-margin">
                        <div className="contact-city">
                            <TextInput name="City *" 
                            maxLength="25" 
                            ref={(input) => { this.cityInput = input;}} 
                            values={isNil(tempObj.city) ? "" : tempObj.city} 
                            onMaxLengthReached={()=>{this._focusNextField('postalInput')}}
                            errorMessage={this.state.cityError}/>
                        </div>
                        <div className="contact-postal">
                            <TextInput name="Postal Code" 
                            maxLength="6" 
                            ref={(input) => { this.postalInput = input;}} 
                            values={isNil(tempObj.postalCode) ? "" : tempObj.postalCode} 
                            onMaxLengthReached={()=>{this._focusNextField('savebutton')}}/>
                        </div>
                    </div>
                    <div className="row auto-margin">
                        <div className="show-image">
                            {
                                isNil(this.props.modalData.image) ? null : <img className="edit-image" src={this.props.modalData.image}/>
                            }   
                        </div>
                        <div className="contact-image">
                            <span>
                                <p className="upload-message">Click to upload an image</p>
                                <label htmlFor='single'>
                                    <FontAwesomeIcon icon={faImage} color='#f28a3f' size='7x' />
                                </label>
                                <input id="single" type="file" className="upload" onChange={this._fileSelectHandler} 
                                style= {{display : "none"}}ref={fileInput => this.fileInput = fileInput}
                                accept=".png, .jpg, .jpeg, .svg"/>
                                <p className="error-message">{this.state.imageError}</p>
                            </span>
                        </div>
                        <div className="btn-container">
                            <button className="save-button hotel-save" onClick={this._onClickSave}>Save</button>
                            <button className="cancel-button hotel-cancel" onClick={this._onClickCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}