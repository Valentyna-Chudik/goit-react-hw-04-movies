import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import SearchBar from '../../components/SearchBar/SearchBar';
import * as movieAPI from '../../services/movie-api';
import styles from '../HomePageView/HomePageView.module.css';
import defaultImg from '../../noPoster.png';

export default function MoviePageView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }

    movieAPI.fetchMovie(query).then(({ results }) => {
      if (results.length === 0) {
        toast.error(`No results were found for ${query}!`);
        return;
      }
      setMovies(results);
    });
  }, [query]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery);
  }, [location.search]);

  const onChangeQuery = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setMovies([]);
    history.push({ ...location, search: `query=${newQuery}` });
  };

  return (
    <>
      {/* <PageHeading text="Movie name" /> */}
      <SearchBar onSubmit={onChangeQuery} />

      {movies && (
        <div className={styles.container}>
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.item}>
                <Link to={`${url}/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                        : defaultImg
                    }
                    alt={movie.title}
                    className={styles.image}
                  />
                  <h2 className={styles.title}>{movie.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
