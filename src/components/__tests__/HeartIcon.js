import React from 'react';
import HeartIcon from '../HeartIcon';
import renderer from 'react-test-renderer';

describe('Heart Icon', () => {
  it('renders', () => {
    const comp = renderer.create(<HeartIcon />);
    expect(comp.toJSON()).toMatchSnapshot();
  });
});
