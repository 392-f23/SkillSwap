// searchBar.test.jsx

import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBar from './searchBar';

describe('SearchBar Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.exists()).toBe(true);
  });

  it('handles name search correctly', () => {
    const onSearchMock = jest.fn();
    const wrapper = shallow(<SearchBar onSearch={onSearchMock} />);

    wrapper.find('input').simulate('change', { target: { value: 'John' } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(onSearchMock).toHaveBeenCalledWith('John', 'name');
  });

  it('handles skills search correctly', () => {
    const onSearchMock = jest.fn();
    const wrapper = shallow(<SearchBar onSearch={onSearchMock} />);

    wrapper.find('input').simulate('change', { target: { value: 'React' } });
    wrapper.find('select').simulate('change', { target: { value: 'skills' } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(onSearchMock).toHaveBeenCalledWith('React', 'skills');
  });

  it('prevents default form submission', () => {
    const preventDefaultMock = jest.fn();
    const wrapper = shallow(<SearchBar onSearch={() => {}} />);

    wrapper.find('form').simulate('submit', { preventDefault: preventDefaultMock });

    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('renders the component with initial state', () => {
    const wrapper = mount(<SearchBar onSearch={() => {}} />);
    expect(wrapper.state('searchTerm')).toEqual('');
    expect(wrapper.state('searchType')).toEqual('name');
  });
});
