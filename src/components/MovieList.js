/*
TODO: Creating Query components

PART 1:
1. Remove the seed data that's currently powering the MovieTile component
2. Create queries - you should have two (GET_MOVIES) and (GET_LIKED_MOVIES).
Both should share the same fields through a fragment.
3. You can pass different queries into the Query component depending on state and props.
Check out this.state.sort and the Filter component to choose your query based on what
sorting option is selected. You can also pass in different variables to your queries depending on props and state.
4. Handle loading and error state

PART 2:
1. Wire up the load more button so it uses fetchMore for pagination
2. HINT: Each page has 20 items. This will help you when you calculate the next page number
*/

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MovieTile from './MovieTile';
import Filter from './Filter';

const MovieInfoFragment = gql`
  fragment MovieInfo on Movie {
    id
    title
    isLiked
    score
    overview
    popularity
    poster
    cast {
      name
      id
      photo
    }
  }
`;

export const GET_MOVIES = gql`
  query movieList($sort: SORT_TYPE, $page: Int!) {
    movies(sort: $sort, page: $page) {
      __typename
      ...MovieInfo
    }
  }
  ${MovieInfoFragment}
`;

export const GET_LIKED_MOVIES = gql`
  {
    likes {
      __typename
      ...MovieInfo
    }
  }
  ${MovieInfoFragment}
`;

export default class MovieList extends Component {
  state = { sort: 'POPULARITY' };

  onFilterChange = sort => this.setState({ sort });

  render = () => {
    return (
      <Query
        query={this.state.sort !== 'LIKES' ? GET_MOVIES : GET_LIKED_MOVIES}
        fetchPolicy={
          this.state.sort !== 'LIKES' ? 'cache-first' : 'cache-and-network'
        }
        variables={
          this.state.sort !== 'LIKES'
            ? {
                showLikes: false,
                page: 1,
                sort: this.state.sort,
              }
            : {}
        }
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return 'Loading...';
          if (error) return `${error}`;

          return (
            <div>
              <Filter
                onFilterChange={this.onFilterChange}
                selected={this.state.sort}
              />
              {(data.movies || data.likes).map(movie => (
                <MovieTile key={movie.id} movie={movie} />
              ))}
              {data.movies && (
                <button
                  onClick={() => {
                    const newPage = Math.floor(data.movies.length / 20) + 1;
                    return fetchMore({
                      variables: {
                        page: newPage,
                      },
                      updateQuery: (previous, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return previous;
                        return {
                          movies: [
                            ...previous.movies,
                            ...fetchMoreResult.movies,
                          ],
                        };
                      },
                    });
                  }}
                >
                  Load More
                </button>
              )}
            </div>
          );
        }}
      </Query>
    );
  };
}
