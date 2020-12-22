// https://api.themoviedb.org/3/movie/550?api_key=6416483a86ac2b9cca0398229e64bbc6

const BASE_URL = 'https://developers.themoviedb.org/3/';
const API_KEY = '6416483a86ac2b9cca0398229e64bbc6';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchMovie() {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query='new year'&language=en-US&page=1`,
  );
}

export function fetchMovieDetails(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCredits(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movie_id}/credits?api_key= ${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movie_id}/reviews?api_key= ${API_KEY}&language=en-US&page=1`,
  );
}
