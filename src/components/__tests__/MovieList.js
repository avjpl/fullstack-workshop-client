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
import { MockedProvider } from 'react-apollo/test-utils';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieTile from '../MovieTile';
import MovieList, { GET_MOVIES, GET_LIKED_MOVIES } from '../MovieList';
import { wait, mockMovie } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });

describe('MovieList', () => {
  it('renders', () => {
    shallow(
      <MockedProvider mocks={[]}>
        <MovieList />
      </MockedProvider>,
    );
  });

  it('renders initially in loading state', () => {
    const comp = shallow(
      <MockedProvider mocks={[]}>
        <MovieList />
      </MockedProvider>,
    );
    expect(comp.html()).toContain('Loading');
  });

  it('loads list of movies', async () => {
    const mocks = [
      {
        request: {
          query: GET_MOVIES,
          variables: {
            showLikes: false,
            page: 1,
            sort: 'POPULARITY',
          },
        },
        result: { data: { movies: [mockMovie] } },
      },
    ];

    const comp = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>,
    );

    await wait();
    comp.update(); // force a rerender after waiting

    const movie = comp.find(MovieTile);
    expect(movie.length).toEqual(1);
  });

  // TODO: Exercise
  it('loads list of liked movies', async () => {
    const mocks = [
      {
        request: {
          query: GET_LIKED_MOVIES,
        },
        result: { data: { likes: [mockMovie] } },
      },
    ];

    const comp = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>,
    );

    const list = comp.find(MovieList);
    list.instance().onFilterChange('LIKES');

    await wait();
    comp.update(); // force a rerender after waiting

    const movie = comp.find(MovieTile);
    expect(movie.length).toEqual(1);
  });

  it('renders error', async () => {
    const mocks = [
      {
        request: {
          query: GET_MOVIES,
          variables: {
            showLikes: false,
            page: 1,
            sort: 'POPULARITY',
          },
        },
        error: new Error('oh noe'),
      },
    ];

    const comp = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>,
    );

    await wait();

    expect(comp.text()).toContain('oh noe');
  });
});
