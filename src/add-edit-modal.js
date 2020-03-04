import React from 'react';
import './styles/hotelInfo.css';
import {TextInput} from './shared.js';
import { Upload } from '@progress/kendo-react-upload';

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
    }

    _focusNextField(refName) {
        if(this[refName]) {
          this[refName].setFocus();
        }
    }

    render(){
        let tempObj = {};

        return(
            <div className="add-edit-form">
                <div className="form-header">
                    <div className="add-edit-header">
                        <div className="add-edit-gradient">
                        </div>
                    </div>
                    <div className="hotel-form">
                        <div className="row auto-margin">
                            <div className="address-title"><TextInput name="Hotel Title"  ref={(input) => { this.titleInput = input; }} maxLength="25" autofocus onMaxLengthReached={()=>{this._focusNextField('name')}}/></div>
                            <div className="hotel-name"><TextInput name="Hotel Name"  ref={(input) => { this.name = input; }} maxLength="256" onMaxLengthReached={()=>{this._focusNextField('address1Input')}}/></div>
                        </div>
                        <div className="row auto-margin">
                            <div className="contact-address"><TextInput name="Address Line 1"  ref={(input) => { this.address1Input = input; }} maxLength="256"  onMaxLengthReached={()=>{this._focusNextField('address2Input')}}/></div>
                            <div className="contact-address"><TextInput name="Address Line 2"  ref={(input) => { this.address2Input = input; }} maxLength="256" onMaxLengthReached={()=>{this._focusNextField('cityInput')}}/></div>
                        </div>
                        <div className="row auto-margin">
                            <div className="contact-city"><TextInput name="City" maxLength="25" ref={(input) => { this.cityInput = input;}} onMaxLengthReached={()=>{this._focusNextField('stateInput')}}/></div>
                            <div className="contact-state"><TextInput name= "State" maxLength="25" ref={(input) => { this.stateInput = input;}}onMaxLengthReached={()=>{this._focusNextField('postalInput')}}/></div>
                        </div>
                        <div className="row auto-margin">
                            <div className="contact-postal"><TextInput name="Postal Code" maxLength="6" ref={(input) => { this.postalInput = input;}} onMaxLengthReached={()=>{this._focusNextField('savebutton')}}/></div>
                            
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
            </div>
        )
    }
}