import React from 'react';
import TestUtils from 'react-dom/test-utils';
import HotelTile from '../hotel-tile.js';
import image from '../images/banner.jpg';

it('should render dom with correct elements', () => {
    let item = {
        "image" : image
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelTile itemIndex={1} itemKey={1} item={item}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile, "logo-container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile, "hotelname_container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile,"tile-settings")).not.toBeNull();
});


it('should have no right margin for the fourth tile item', () => {
    let item = {
        "image" : image
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelTile itemIndex={3} itemKey={1} item={item}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(viewTile, "hotel-tile no-right-margin")).not.toBeNull();
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
    let viewTile = TestUtils.renderIntoDocument(<HotelTile item={item} itemIndex={1} itemKey={1} performAction={performAction}/>);

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
    let viewTile = TestUtils.renderIntoDocument(<HotelTile item={item} itemIndex={1} itemKey={1} performAction={performAction}/>);
    spyOn(viewTile,"_handleOptionsClick");
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(viewTile, "settings"));
    setTimeout(()=>{
        let items = TestUtils.scryRenderedDOMComponentsWithClass(viewTile, "Items");
        TestUtils.Simulate.click(items[1]);
    }, 100) 
});

it("should call _handleOptionsClick if general area like title/hotelname clicked", () => {
    let item = {
        "image" : image,
        "name" : "name"
    }
    let viewTile = TestUtils.renderIntoDocument(<HotelTile item={item} itemIndex={1} itemKey={1} performAction={jest.fn()}/>);
    spyOn(viewTile,"_handleOptionsClick");
    let title = TestUtils.findRenderedDOMComponentWithClass(viewTile, "hotelname_container");
    TestUtils.Simulate.click(title);
    expect(viewTile._handleOptionsClick).toHaveBeenCalledWith("Edit");
});