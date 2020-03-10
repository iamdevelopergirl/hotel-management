import React from 'react';
import TestUtils from 'react-dom/test-utils';
import AccountHeader from '../account-header.js';

it('should render DOM ', () => {
    const pageHeader = TestUtils.renderIntoDocument(
      <AccountHeader email="test"/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name").innerHTML).toEqual('test');
});

it('should hide signout popup on calling hidePopup', () => {
    const pageHeader = TestUtils.renderIntoDocument(
      <AccountHeader showPopup email="test"/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name").innerHTML).toEqual('test');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name")
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "base-popup")).not.toBeNull();

    pageHeader.hidePopup();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(pageHeader, "base-popup").length).toEqual(0);
});

it('should show signout popup on click of account element', () => {
    const pageHeader = TestUtils.renderIntoDocument(
      <AccountHeader showPopup email="test"/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name").innerHTML).toEqual('test');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name")
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "base-popup")).not.toBeNull();
});

it('should not show signout popup on click of account element is showPopup is not defined', () => {
    const pageHeader = TestUtils.renderIntoDocument(
      <AccountHeader email="test"/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name").innerHTML).toEqual('test');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name")
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(pageHeader, "base-popup").length).toEqual(0);
});

it('should call the props function when signout is clicked', () => {
    let propFunc = jest.fn()
    const pageHeader = TestUtils.renderIntoDocument(
      <AccountHeader showPopup email="test" onLogoutClicked={propFunc}/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name").innerHTML).toEqual('test');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(pageHeader, "account-name")
    );

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(pageHeader, "content-wrapper")
    );
    expect(propFunc).toHaveBeenCalled();
});