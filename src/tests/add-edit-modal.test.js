import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import TestUtils from 'react-dom/test-utils';
import AddEditModal from '../add-edit-modal.js';

it("should render the dom with correct element", ()=>{
    let addEditModalView = TestUtils.renderIntoDocument(<AddEditModal modalData={}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(addEditModalView, "add-edit-form")).not.toBeNull();
});