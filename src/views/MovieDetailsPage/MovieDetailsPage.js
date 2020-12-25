import { useState, useEffect } from 'react';
import {
  NavLink,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
} from 'react-router-dom';

import * as movieAPI from '../../services/movie-api';
import CastView from '../CastView/CastView';
import ReviewsView from '../ReviewsView/ReviewsView';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsView() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  let history = useHistory();

  return (
    <>
      <button onClick={() => history.goBack()} className={styles.button}>
        Go Back
      </button>
      <div className={styles.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
          to={`${url}/cast`}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={`${url}/reviews`}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Reviews
        </NavLink>
      </nav>

      <Route exact path={`${path}/cast`}>
        <CastView movieId={movieId} />
      </Route>

      <Route exact path={`${path}/reviews`}>
        <ReviewsView movieId={movieId} />
      </Route>
    </>
  );
}
