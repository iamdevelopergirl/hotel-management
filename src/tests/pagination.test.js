import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

import Pagination from '../pagination.js';


it("should render dom with correct elements", () => {
    let paginationView = mount(<Pagination itemsPerPage={2} totalItems={4} />);
    expect(paginationView.find('.navigation')).not.toBeNull();
    expect(paginationView.find('.pagination')).not.toBeNull()
    expect(paginationView.find('.page-item')).not.toBeNull();
});

it("should have 2 pages when the total item is 4 and itemsPerPage is 2", ()=>{
    let paginationView = mount(<Pagination itemsPerPage={2} totalItems={4} paginate={jest.fn()}/>);
    expect(paginationView.find('.navigation')).not.toBeNull();
    expect(paginationView.find('.pagination')).not.toBeNull()
    expect(paginationView.find('.page-item')).not.toBeNull();
    expect(paginationView.find('.page-link').length).toEqual(2);
});

it("should not show page links when the totel items are 0", ()=>{
    let paginationView = mount(<Pagination itemsPerPage={2} totalItems={0} paginate={jest.fn()}/>);
    expect(paginationView.find('.navigation')).not.toBeNull();
    expect(paginationView.find('.pagination')).not.toBeNull()
    expect(paginationView.find('.page-link').length).toEqual(0);
});