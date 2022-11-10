const API_KEY = 'fb2c84dd28cdf4cc320c4b6ed588d26e';
const BASE_URL = 'https://api.themoviedb.org/3';

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(res =>
    res.json(),
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  ).then(res => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  ).then(res => res.json());

export const moviesApi = {trending, upcoming, nowPlaying};
