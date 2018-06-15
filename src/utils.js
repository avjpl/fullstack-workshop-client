export const mockMovie = {
  __typename: 'Movie',
  id: 1,
  title: 'A Movie',
  isLiked: false,
  score: 5.0,
  overview: 'a movie about a thing',
  popularity: 5.0,
  poster: 'https://dog.ceo/api/breeds/image/random',
  cast: [
    {
      name: 'Jane',
      id: 1,
      photo: 'https://dog.ceo/api/breeds/image/random',
    },
  ],
};

// thanks Wes Bos 👍 https://npm.im/waait
export const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));
