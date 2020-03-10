import React from 'react';
import TestUtils from 'react-dom/test-utils';
import DeleteConfirmation from '../delete-confirmation.js';


it("should render dom with correct class values when called", ()=>{
    let deleteConfirmationView = TestUtils.renderIntoDocument(<DeleteConfirmation />);
    expect(TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "unsure-logo")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "delete-item-header").innerHTML).toBe("Are you sure?");
    expect(TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "delete-item-text").innerHTML).toBe("Do you want to delete this item? This cannot be undone.");
    expect(TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "confirm-delete-item")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "delete-item-cancel-button")).not.toBeNull();
});

it("should call prop function with empty object when clicking delete", ()=>{
    let handleFunction = jest.fn();
    let data = {
        "modalData": {},
        "searchKey": undefined
    }
    let deleteConfirmationView = TestUtils.renderIntoDocument(<DeleteConfirmation handleModal={handleFunction}/>);
    TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "confirm-delete-item"));
    expect(handleFunction).toHaveBeenCalledWith(data);
});

it("should call prop function with undefined when clicking cancel", ()=>{
    let handleFunction = jest.fn();
    let deleteConfirmationView = TestUtils.renderIntoDocument(<DeleteConfirmation handleModal={handleFunction}/>);
    TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(deleteConfirmationView, "delete-item-cancel-button"));
    expect(handleFunction).toHaveBeenCalledWith();
});