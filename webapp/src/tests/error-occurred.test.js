import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

import { ErrorOccurred } from '../error-occurred';

it("should render correct elements", ()=>{
    let errorOccurredView = mount(<ErrorOccurred />);
    expect(errorOccurredView.find('.spinner')).not.toBeNull();
    expect(errorOccurredView.find('.fadein')).not.toBeNull()
});