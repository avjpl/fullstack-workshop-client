import React from 'react';
import Filter from '../Filter';
import renderer from 'react-test-renderer';

describe('Filter', () => {
  it('renders', () => {
    const comp = renderer.create(<Filter />);
    expect(comp.toJSON()).toMatchSnapshot();
  });

  it('allows control from `selected` prop', () => {
    const comp = renderer.create(<Filter selected="LIKES" />);
    const select = comp.root.findByType('select');
    expect(select.props.value).toEqual('LIKES');
  });
});
