import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import {AuthContext} from '../App'
import {reducer} from '../Main.js';

import { render } from '@testing-library/react';
import Main from '../Main.js';
import TestUtils from 'react-dom/test-utils';

// it("should render main view", () => {

//   let dispatch = jest.fn();
//   let mainView = mount(
//       <AuthContext.Provider value={{dispatch}}>
//           <Main />
//       </AuthContext.Provider>
//       )
//    console.log(mainView);
//   // expect(TestUtils.findRenderedDOMComponentWithClass(mainView, "App")).not.toBeNull();
// });

it('returns new state for "FETCH_ITEMS_REQUEST" type', () => {
  const initialState = {
    hotelItems: [],
    isFetching: false,
    hasError: false,
  };
  const updateAction = {type: 'FETCH_ITEMS_REQUEST'}
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual({hotelItems : [], isFetching : true, hasError : false});
});

it('returns new state for FETCH_ITEMS_SUCCESS type', () => {
  const initialState = {
    hotelItems: [],
    isFetching: false,
    hasError: false,
  };
  const updateAction = {type: 'FETCH_ITEMS_SUCCESS', payload : ["1"]}
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual({hotelItems : ["1"], isFetching : false, hasError : false});
});

it('returns new state for neither login nor logout type', () => {
  const initialState = {
    hotelItems: [],
    isFetching: false,
    hasError: false,
  };
  const updateAction = {type: "FETCH_ITEMS_FAILURE"}
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual({hotelItems : [], isFetching : false, hasError : true});
});
