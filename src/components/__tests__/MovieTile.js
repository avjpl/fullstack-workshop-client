import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloProvider } from 'react-apollo';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieTile, { TOGGLE_MOVIE_LIKE } from '../MovieTile';
import { GET_LIKED_MOVIES } from '../MovieList';
import Heart from '../HeartIcon';
import { wait, mockMovie } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });

describe('MovieTile', () => {
  it('renders', () => {
    mount(
      <MockedProvider mocks={[]}>
        <MovieTile movie={mockMovie} />
      </MockedProvider>,
    );
  });

  it('fires mutation and updates on heart press', async () => {
    const mocks = [
      {
        request: { query: TOGGLE_MOVIE_LIKE, variables: { id: 1 } },
        result: {
          data: { toggleLike: { __typename: 'Movie', id: 1, isLiked: true } },
        },
      },
    ];

    const comp = mount(
      <MockedProvider mocks={mocks} addTypename={true}>
        <MovieTile movie={mockMovie} />
      </MockedProvider>,
    );

    // we have to prime the ApolloProvider cache before we can
    // run this mutation
    const clientForMock = comp.find('ApolloProvider').props().client;
    clientForMock.cache.writeQuery({
      query: GET_LIKED_MOVIES,
      data: { likes: [] },
    });

    const heart = comp.find(Heart);
    heart.simulate('click');

    await wait();
    comp.update();

    // check the cache to see if the new like was added
    expect(
      clientForMock.cache.readQuery({ query: GET_LIKED_MOVIES }).likes.length,
    ).toEqual(1);
  });
});
