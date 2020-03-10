import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NoItemView from '../no-item-view.js';

it("should render dom with correct element", ()=>{
    let noItemView = TestUtils.renderIntoDocument(<NoItemView/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(noItemView, "no-item-view")).not.toBeNull();
});