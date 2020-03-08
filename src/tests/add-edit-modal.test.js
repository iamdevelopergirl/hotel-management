import React from 'react';
import TestUtils from 'react-dom/test-utils';
import AddEditModal from '../add-edit-modal.js';

it("should render the dom with no title", ()=>{
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "add-edit-form")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "add-edit-title").innerText).toBe(undefined);
});

it("should render the dom with no value for any of the input fields", ()=>{
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "add-edit-form")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "add-edit-title").innerText).toBe(undefined);
});


it('should set the entered values when modalData is empty',() => { 
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    expect(addEditModalView).not.toBeNull();
    addEditModalView.name.state.values = "new1";
    addEditModalView.address1Input.state.values = "new2";
    addEditModalView.address2Input.state.values = "new3";
    addEditModalView.cityInput.state.values = "new4";
    addEditModalView.postalInput.state.values = "new5";
    addEditModalView.phoneNumberInput.state.values = "new6";

    expect(addEditModalView.name.state.values).toBe("new1");
    expect(addEditModalView.address1Input.state.values).toBe("new2");
    expect(addEditModalView.address2Input.state.values).toBe("new3");
    expect(addEditModalView.cityInput.state.values).toBe("new4");
    expect(addEditModalView.postalInput.state.values).toBe("new5");
    expect(addEditModalView.phoneNumberInput.state.values).toBe("new6");
    
});

  it('should set the values from modalData when modalData is not empty',() => { 
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData}/>);
    expect(addEditModalView).not.toBeNull();

    expect(addEditModalView.name.state.values).toBe("new1");
    expect(addEditModalView.address1Input.state.values).toBe("new2");
    expect(addEditModalView.address2Input.state.values).toBe("new3");
    expect(addEditModalView.cityInput.state.values).toBe("new4");
    expect(addEditModalView.postalInput.state.values).toBe("new5");
    expect(addEditModalView.phoneNumberInput.state.values).toBe("new6");
    
});

it('should set the selected file state to the image after upload when the upload button is clicked',() => { 
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    expect(addEditModalView).not.toBeNull();
    
    let uploadButton = TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "upload");
    TestUtils.Simulate.click(uploadButton);
    expect(addEditModalView.state.selectedFile).not.toBe(null); 
});

it('should call _fileSelectHandler when the upload button is changed',() => { 
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    expect(addEditModalView).not.toBeNull();
    
    let uploadButton = TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "upload").value ="";
    TestUtils.Simulate.change(uploadButton);
    expect(addEditModalView.state.selectedFile).not.toBe(null); 
});

it("should not set any error message after performing validation for correct values", ()=>{
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    let addObj = { name : "new1", address1 : "new2" , city : "new4", phoneNumber : "89078923",  "image" : "logo"};
    
    addEditModalView._performValidation(addObj);

    expect(addEditModalView.state.hotelNameError).toBe("");
    expect(addEditModalView.state.addressError).toBe("");
    expect(addEditModalView.state.cityError).toBe("");
    expect(addEditModalView.state.phoneNumberError).toBe("");
    expect(addEditModalView.state.imageError).toBe("");
});

it("should set the correct error message after performing validation for incorrect values", ()=>{
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{}}/>);
    
    let addObj = { name : "", address1 : "new2" , city : "new4", phoneNumber : "89078923",  "image" : "logo"}; 
    addEditModalView._performValidation(addObj);
    expect(addEditModalView.state.hotelNameError).toBe("Hotel name cannot be empty");

    addObj = { name : "new1", address1 : "" , city : "new4", phoneNumber : "89078923",  "image" : "logo"}; 
    addEditModalView._performValidation(addObj);
    expect(addEditModalView.state.addressError).toBe("Address cannot be empty");

    addObj = { name : "new1", address1 : "new2" , city : "", phoneNumber : "89078923",  "image" : "logo"}; 
    addEditModalView._performValidation(addObj);
    expect(addEditModalView.state.cityError).toBe("City cannot be empty");

    addObj = { name : "new1", address1 : "new2" , city : "new3", phoneNumber : "new4",  "image" : "logo"}; 
    addEditModalView._performValidation(addObj);
    expect(addEditModalView.state.phoneNumberError).toBe("Phone Number should be in numbers");

    addObj = { name : "new1", address1 : "new2" , city : "new3", phoneNumber : "new4",  "image" : null}; 
    addEditModalView._performValidation(addObj);
    expect(addEditModalView.state.imageError).toBe("Please upload atleast one image");
});

it("should call prop function when the performValidation during save returns false", ()=>{
    let onActionMock = jest.fn();
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData} handleModal={onActionMock}/>);
    let spyOnPerform = jest.spyOn(addEditModalView, "_performValidation").mockImplementation(() => false);
    let saveButton = TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "save-button");
    TestUtils.Simulate.click(saveButton);
    expect(spyOnPerform).toHaveBeenCalled();
    expect(onActionMock).toHaveBeenCalled();
});

it("should not call prop function when the performValidation during save returns true", ()=>{
    let onActionMock = jest.fn();
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData} handleModal={onActionMock}/>);
    let spyOnPerform = jest.spyOn(addEditModalView, "_performValidation").mockImplementation(() => true);
    let saveButton = TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "save-button");
    TestUtils.Simulate.click(saveButton);
    expect(spyOnPerform).toHaveBeenCalled();
    expect(onActionMock).not.toHaveBeenCalled();
});

it("should call cancel when the cancel button is clicked", ()=>{
    let onActionMock = jest.fn();
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData} handleModal={onActionMock}/>);
    let spyOnPerform = jest.spyOn(addEditModalView, "_performValidation");
    let cancelButton = TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "cancel-button");
    TestUtils.Simulate.click(cancelButton);
    expect(spyOnPerform).not.toHaveBeenCalled();
    expect(onActionMock).toHaveBeenCalledWith();
});

it('should call focusNextField with phoneNumberInput as param when onMaxLengthReached is executed on name Input', () => {
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData}/>);
    let spyOnFocus = jest.spyOn(addEditModalView, "_focusNextField");
    addEditModalView.name.props.onMaxLengthReached();
    expect(spyOnFocus).toHaveBeenCalledWith('phoneNumberInput');
});

it('should call focusNextField with address1Input as param when onMaxLengthReached is executed on phoneNumberInput Input', () => {
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={{modalData}}/>);
    let spyOnFocus = jest.spyOn(addEditModalView, "_focusNextField");
    addEditModalView.phoneNumberInput.props.onMaxLengthReached();
    expect(spyOnFocus).toHaveBeenCalledWith('address1Input');
});

it('should call focusNextField with address2Input as param when onMaxLengthReached is executed on address1Input Input', () => {
    let modalData = { name : "new1", address1 : "new2" , address2 : "new3", city : "new4", postalCode : "new5", phoneNumber : "new6",  "image" : "logo"}
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={modalData}/>);
    let spyOnFocus = jest.spyOn(addEditModalView, "_focusNextField");
    addEditModalView.address1Input.props.onMaxLengthReached();
    expect(spyOnFocus).toHaveBeenCalledWith('address2Input');
});