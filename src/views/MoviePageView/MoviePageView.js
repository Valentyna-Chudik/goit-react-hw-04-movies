import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import SearchBar from '../../components/SearchBar/SearchBar';
import PaginationList from '../../components/PaginationList/PaginationList';
import * as movieAPI from '../../services/movie-api';
import styles from '../HomePageView/HomePageView.module.css';
import defaultImg from '../../noPoster.png';

export default function MoviePageView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (!query) {
      return;
    }

    movieAPI.fetchMovie(query, page).then(({ results, total_pages }) => {
      if (results.length === 0) {
        toast.error(`No results were found for ${query}!`);
        return;
      }
      setMovies(results);
      setTotalPages(total_pages);
    });
  }, [query, page]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery, page);
  }, [location.search, page]);

  const onChangeQuery = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setMovies([]);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };

  const onChangePage = (_event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });

    const options = {
      top: 0,
      behavior: 'smooth',
    };
    window.scrollTo(options);
  };

  return (
    <>
      <SearchBar onSubmit={onChangeQuery} />

      {movies && (
        <div className={styles.container}>
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.item}>
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: { from: location },
                  }}
                >
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
      <PaginationList
        page={Number(page)}
        totalPages={totalPages}
        handleChange={onChangePage}
      />
    </>
  );
}
