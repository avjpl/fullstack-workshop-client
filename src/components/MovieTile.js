/*
TODO: Advanced Mutation components

1. Write a TOGGLE_MOVIE_LIKE mutation.
2. Create a Mutation component that wraps all of the MovieTile UI.
3. Hook up the toggleLike mutate function to the Heart component.
4. Add an optimistic response so our UI feels snappy

Once you have it working, do you notice anything strange about the UI?
Navigate to the liked movies list and try liking/unliking some movies

We need a way to update the cache after a mutation!
Read this docs page: https://www.apollographql.com/docs/react/essentials/mutations.html#update
Bonus! Try to implement the update function yourself.
We'll do it together after this exercise.
*/

import React from 'react';

import Heart from './HeartIcon';

export default ({
  movie: { title, poster, overview, popularity, score, isLiked, id },
  user,
}) => (
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
      <Heart active={isLiked} onClick={() => {}} />
    </div>
  </div>
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
