/*
TODO: Mutation components

PART 2:
1. Hook up the toggleLike mutation to the Heart component.
You can wrap the whole MovieTile component in the Mutation component.
2. Add an optimistic response so our UI feels snappy
Once you have it working, do you notice anything strange about the UI?
Navigate to the liked movies list and try liking/unliking some movies

We need a way to update the cache after a mutation!
Read this docs page: https://www.apollographql.com/docs/react/essentials/mutations.html#update
Bonus! Try to implement the update function yourself.
We'll do it together after this exercise.
*/

import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_LIKED_MOVIES } from './MovieList';
import Heart from './HeartIcon';

export const TOGGLE_MOVIE_LIKE = gql`
  mutation toggleMovieLike($id: ID!) {
    toggleLike(id: $id) {
      id
      isLiked
    }
  }
`;

export default ({ movie, user }) => (
  <Mutation
    mutation={TOGGLE_MOVIE_LIKE}
    update={(cache, { data: { toggleLike } }) => {
      const { likes } = cache.readQuery({ query: GET_LIKED_MOVIES });
      // if the movie was already liked, remove.
      // if not, add to list of likes
      const newLikes = likes.find(l => l.id === movie.id)
        ? likes.filter(like => like.id !== toggleLike.id)
        : [...likes, movie];
      cache.writeQuery({
        query: GET_LIKED_MOVIES,
        data: { likes: newLikes },
      });
    }}
  >
    {toggleMovieLike => {
      const { title, poster, overview, popularity, score, isLiked, id } = movie;
      return (
        <div style={styles.container}>
          {poster ? (
            <img src={poster} style={styles.image} alt={title} />
          ) : (
            <p style={styles.image}>🎬 Poster coming soon</p>
          )}
          <div style={styles.content}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.overview}>{overview}</p>
            <p>
              {score > 0
                ? `Rating: ${score}/10 ${score > 5 ? '👏' : '👎'}`
                : 'Not rated yet!'}
            </p>
            <Heart
              active={isLiked}
              onClick={() =>
                toggleMovieLike({
                  variables: { id },
                  optimisticResponse: {
                    toggleLike: {
                      __typename: 'Movie',
                      id,
                      isLiked: !isLiked,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      );
    }}
  </Mutation>
);

const styles = {
  container: {
    minHeight: 160,
    padding: 8,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: '1px solid',
    marginBottom: 16,
    borderRadius: 4,
  },
  image: {
    height: 160,
    maxWidth: 110,
  },
  title: {
    display: 'inline',
  },
  content: {
    marginLeft: 8,
    flex: 1,
  },
  overview: {
    marginTop: 8,
  },
};
