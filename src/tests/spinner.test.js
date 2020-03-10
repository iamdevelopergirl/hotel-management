import React from 'react';
import TestUtils from 'react-dom/test-utils';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

import { Spinner } from '../spinner.js';

it("should render correct elements", ()=>{
    let spinnerView = mount(<Spinner />);
    expect(spinnerView.find('.spinner')).not.toBeNull();
    expect(spinnerView.find('.fadein')).not.toBeNull()
    expect(spinnerView.find('.rolling')).not.toBeNull();
});