import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as movieAPI from '../../services/movie-api';

import styles from './HomePageView.module.css';

export default function HomePageView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    movieAPI.fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <>
      <div className={styles.container}>
        {movies && (
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.item}>
                <Link to={`${url}movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.image}
                  />
                  <h2 className={styles.title}>{movie.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
