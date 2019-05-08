/*
TODO: Creating Query components

Queries PART 1:
1. Remove the seed data that's currently powering the MovieTile component
2. Create a query for GET_MOVIES.
3. Check out this.state.sort and the Filter component to pass in the sort variable to your query. You will want to sort by POPULARITY and RELEASE_DATE.
4. Handle loading and error state

Queries PART 2:
1. Wire up the load more button so it uses fetchMore for pagination
2. HINT: Each page has 20 items. This will help you when you calculate the next page number

Advanced Queries:
1. Create a query for GET_LIKED_MOVIES and use a fragment to share fields with the GET_MOVIES query.
2. Use the value of this.state.sort to determine when to call the GET_LIKED_MOVIES query. Remember to check the schema to determine if the likes query has variables or not.
3. Extra Credit: The GET_LIKED_MOVIES query should always make a network request after serving cached data first. Look in the Apollo docs to learn how to set the query's fetchPolicy.
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

const GET_MOVIES = gql`
  query movieList($sort: SORT_TYPE, $page: Int!) {
    movies(sort: $sort, page: $page) {
      ...MovieInfo
    }
  }
  ${MovieInfoFragment}
`;

export const GET_LIKED_MOVIES = gql`
  query GetLikedMovies {
    likes {
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
              {data.movies && <button onClick={() => {}}>Load More</button>}
            </div>
          );
        }}
      </Query>
    );
  };
}
