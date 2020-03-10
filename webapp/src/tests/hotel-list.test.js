import React from 'react';
import TestUtils from 'react-dom/test-utils';
import HotelList from '../hotel-list.js';
import image from '../images/banner.jpg';

it('should render dom with correct elements', () => {
    let item = {
        "image" : image,
        name : "name"
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelList itemIndex={1} itemKey={1} item={item}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile, "list-cell-content")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile, "list-logo-container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile,"list-item-detail")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile,"list-settings")).not.toBeNull();
});

it("should open edit modal when when edit is clicked from options", (done)=>{   
    let performAction = (action, id) => {
      expect(action).toEqual("Edit");
      expect(id).toEqual(1);
      done();
    };
    let item = {
        "image" : image,
        "name" : "name"
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelList item={item} itemIndex={1} itemKey={1} performAction={performAction}/>);

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(viewTile, "settings"));
    let items = TestUtils.scryRenderedDOMComponentsWithClass(viewTile, "Items");
    TestUtils.Simulate.click(items[0]);
});

it("should open delete confirmation modal when when delete is clicked from options", (done)=>{   
    let performAction = (action, id) => {
      expect(action).toEqual("Delete");
      expect(id).toEqual(1);
      done();
    };
    let item = {
        "image" : image,
        "name" : "name"
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelList item={item} itemIndex={1} itemKey={1} performAction={performAction}/>);
    spyOn(viewTile,"_handleOptionsClick");
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(viewTile, "settings"));
    setTimeout(()=>{
        let items = TestUtils.scryRenderedDOMComponentsWithClass(viewTile, "Items");
        TestUtils.Simulate.click(items[1]);
    }, 100) 
});