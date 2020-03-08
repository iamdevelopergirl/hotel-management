import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { ListViewToggle, TileViewToggle } from '../view-toggle.js';

it("should render ListViewToggle", () => {
    const listViewToggle = TestUtils.renderIntoDocument(<ListViewToggle />);
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")).not.toBeNull();
});

it("should render disabled if isDisabled is true", () => {
    const listViewToggle = TestUtils.renderIntoDocument(
      <ListViewToggle isDisabled={true}/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "disabled")).not.toBeNull();
});

it("should render selected if current view is List View", () => {
    const listViewToggle = TestUtils.renderIntoDocument(
      <ListViewToggle selectedViewType="ListView"/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "selected")).not.toBeNull();
});


it("should not do anything on click of disabled toggle", () => {
    let setViewTypeSpy = jest.fn();
    
    const listViewToggle = TestUtils.renderIntoDocument(
      <ListViewToggle isDisabled={true} setViewType={setViewTypeSpy}/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "disabled")).not.toBeNull();
    
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")
    );
    expect(setViewTypeSpy).not.toHaveBeenCalled();
});

it("should set selected and show list view on click of toggle", () => {
    let setViewTypeSpy = jest.fn();

    const listViewToggle = TestUtils.renderIntoDocument(
      <ListViewToggle setViewType={setViewTypeSpy}/>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")).not.toBeNull();
    
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(listViewToggle, "list-view-toggle")
    );
    expect(setViewTypeSpy).toHaveBeenCalledWith("ListView");
});

it("should render TileViewToggle", () => {
    const tileViewToggle = TestUtils.renderIntoDocument(<TileViewToggle />);
    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")).not.toBeNull();
});

it("should render disabled if isDisabled is true", () => {
    const tileViewToggle = TestUtils.renderIntoDocument(
      <TileViewToggle isDisabled={true}/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "disabled")).not.toBeNull();
});

it("should render selected if current view is Tile View", () => {
    const tileViewToggle = TestUtils.renderIntoDocument(
      <TileViewToggle selectedViewType="TileView"/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "selected")).not.toBeNull();
});

it("should not do anything on click of disabled toggle", () => {
    let setViewTypeSpy = jest.fn();
    const tileViewToggle = TestUtils.renderIntoDocument(
      <TileViewToggle isDisabled={true} setViewType={setViewTypeSpy}/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "disabled")).not.toBeNull();

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")
    );
    expect(setViewTypeSpy).not.toHaveBeenCalled();
});

it("should set selected and show tile view on click of toggle", () => {
    let setViewTypeSpy = jest.fn();
    const tileViewToggle = TestUtils.renderIntoDocument(
      <TileViewToggle setViewType={setViewTypeSpy}/>
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")).not.toBeNull();

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(tileViewToggle, "tile-view-toggle")
    );
    expect(setViewTypeSpy).toHaveBeenCalledWith("TileView");
});