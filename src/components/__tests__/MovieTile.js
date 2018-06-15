import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieTile, { TOGGLE_MOVIE_LIKE } from '../MovieTile';
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

  it('fires mutation and updates on heart press', () => {
    const mocks = [
      {
        request: { query: TOGGLE_MOVIE_LIKE, variables: { id: 1 } },
        result: { data: { toggleLike: { id: 1, isLiked: true } } },
      },
    ];
    const comp = mount(
      <MockedProvider mocks={mocks}>
        <MovieTile movie={mockMovie} />
      </MockedProvider>,
    );

    comp.find(Heart).simulate('click');
    // .props()
    // .onClick();
  });
});
