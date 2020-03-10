import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ItemsView from '../item-view.js';
import {ItemsTileView, ItemsListView} from '../item-view.js';

it('should render No Items Found UI when view type is Tile and items is empty', (done) => {
    let viewType = "TileView";
    let items = [];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "no-item-view")).not.toBeNull();
      done();
    }, 500);
});

it('should render No Items Found UI when view type is List and items is empty', (done) => {
    let viewType = "ListView";
    let items = [];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "no-item-view")).not.toBeNull();
      done();
    }, 500);
});

it('should render ItemsTileView when view type is Tile and items is not empty', (done) => {
    let viewType = "TileView";
    let items = [{"1" : {name : "name", "address1" : "address1"}}];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-tile-view")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "hotel-tile")).not.toBeNull();
      done();
    }, 500);
});

it('should render ItemsListView when view type is List and items is not empty', (done) => {
    let viewType = "ListView";
    let items = [{"1" : {name : "name", "address1" : "address1"}}];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-list-view")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "list-cell")).not.toBeNull();
      done();
    }, 500);
});

it('should render 3 tiles if 3 items are passed', (done)=>{
    let viewType = "TileView";
    let items = [{"1" : {name : "name", "address1" : "address1"}},
                 {"2" : {name : "name", "address1" : "address1"}},
                 {"3" : {name : "name", "address1" : "address1"}}];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-tile-view")).not.toBeNull();
      expect(TestUtils.scryRenderedDOMComponentsWithClass(itemsView, "hotel-tile").length).toEqual(3);
      done();
    }, 500);
});

it('should render 3 lists if 3 items are passed', (done) => {
    let viewType = "ListView";
    let items = [{"1" : {name : "name", "address1" : "address1"}},
                 {"2" : {name : "name", "address1" : "address1"}},
                 {"3" : {name : "name", "address1" : "address1"}}];
    let itemsView = TestUtils.renderIntoDocument(
                      <ItemsView viewType={viewType} items={items}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-content")).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(itemsView, "items-list-view")).not.toBeNull();
      expect(TestUtils.scryRenderedDOMComponentsWithClass(itemsView, "list-cell").length).toEqual(3);
      done();
    }, 500);
});

