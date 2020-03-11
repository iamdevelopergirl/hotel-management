import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ModalContainer from '../modal-container.js';

it('should render Add/Edit Item screen if toDisplay is Edit', () => {
    let modalData = {};
    let toDisplay = "Edit"
    let modalContainer = TestUtils.renderIntoDocument(
        <ModalContainer modalData={modalData} toDisplay={toDisplay}/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(modalContainer, "add-edit-form")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(modalContainer, "add-edit-header")).not.toBeNull();
});

it('should render Delete confirmation screen if toDisplay is Delete', () => {
    let modalData = {};
    let toDisplay = "Delete"
    let modalContainer = TestUtils.renderIntoDocument(
        <ModalContainer modalData={modalData} toDisplay={toDisplay}/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(modalContainer, "delete")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(modalContainer, "delete-item-header")).not.toBeNull();
});