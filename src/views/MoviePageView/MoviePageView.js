// import PageHeading from '../components/PageHeading/PageHeading';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as movieAPI from '../../services/movie-api';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function MoviePageView() {
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }
    movieAPI.fetchMovie(query).then(data => {
      setMovies(data.results);
    });
  }, [query]);

  const onChangeQuery = query => {
    setQuery(query);
    setMovies([]);
  };

  return (
    <>
      {/* <PageHeading text="Movie name" /> */}
      <SearchBar onSubmit={onChangeQuery} />
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
