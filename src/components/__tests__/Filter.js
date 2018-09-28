/**
 * Testing React Components:
 * - Make sure they render with minimal props
 * - You can use snapshot tests on rendered markup to make sure no
 *    accidental changes are made in the future
 * - components that make queries can have network requests mocked, alllwing the
 *    previous two tests to be run against it
 * - components that make mutations can be tested in the same way as listed
 *    above, with an addition: You can test run the mutation, and make
 *    sure the UI and apollo cache get updated properly
 *
 * SEE MORE HERE: https://www.apollographql.com/docs/guides/testing-react-components.html
 */
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
