import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Loader from '../../components/Loader/Loader';

import * as movieAPI from '../../services/movie-api';
import styles from './MovieDetailsPage.module.css';
import defaultImg from '../../noPoster.png';

const CastView = lazy(() =>
  import('../CastView/CastView.js' /* webpackChunkName: "cast-view" */),
);

const ReviewsView = lazy(() =>
  import(
    '../ReviewsView/ReviewsView.js' /* webpackChunkName: "reviews-view" */
  ),
);

export default function MovieDetailsView() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    movieAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  // let history = useHistory();

  return (
    <>
      <button onClick={handleGoBack} className={styles.button}>
        Go Back
      </button>
      <div className={styles.movieContainer}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={styles.image}
        />

        <div className={styles.infoContainer}>
          <h2 className={styles.title}>
            {movie.title}
            <span>
              ({movie.release_date && movie.release_date.slice(0, 4)})
            </span>
          </h2>
          <p className={styles.vote}>User Score:</p>
          <span className={styles.voteAv}>{movie.vote_average * 10}%</span>
          <h3 className={styles.overview}>Overview</h3>
          <p className={styles.descr}>{movie.overview}</p>
          <p className={styles.genresTitle}>Genres</p>
          {movie.genres && (
            <ul className={styles.genresList}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <nav className={styles.navigation}>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location?.state?.from ?? '/' },
          }}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location?.state?.from ?? '/' },
          }}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Route exact path={`${path}/cast`}>
          <CastView movieId={movieId} />
        </Route>

        <Route exact path={`${path}/reviews`}>
          <ReviewsView movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
