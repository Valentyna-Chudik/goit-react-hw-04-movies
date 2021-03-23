import { useState, useEffect, Suspense } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

import * as movieAPI from '../../services/movie-api';
import PaginationList from '../../components/PaginationList/PaginationList';
import Loader from '../../components/Loader/Loader';
import styles from './HomePageView.module.css';
import defaultImg from '../../noPoster.png';

export default function HomePageView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(0);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    movieAPI.fetchTrendingMovies(page).then(({ results, total_pages }) => {
      setMovies(results);
      setTotalPages(total_pages);
    });
  }, [page]);

  const onChangePage = (_event, page) => {
    history.push({ ...location, search: `page=${page}` });

    const options = {
      top: 0,
      behavior: 'smooth',
    };
    window.scrollTo(options);
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        {movies && (
          <div className={styles.container}>
            <ul className={styles.list}>
              {movies.map(movie => (
                <li key={movie.id} className={styles.item}>
                  <Link
                    to={{
                      pathname: `${url}movies/${movie.id}`,
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
      </Suspense>
      <PaginationList
        page={Number(page)}
        totalPages={totalPages}
        handleChange={onChangePage}
      />
    </>
  );
}
