import { useState, useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Route, useParams } from 'react-router-dom';
import * as movieAPI from '../services/movie-api';
import CastView from './CastView';
import ReviewsView from './ReviewsView';

export default function MovieDetailsView() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>
        {movie.title}
        {/* <span>{movie.release_date.slice(0, 4)}</span> */}
      </h2>
      <p>
        User Score: <span>{movie.vote_average * 10}%</span>
      </p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <p>Genres</p>
      {movie.genres && (
        <ul>
          {movie.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      )}
      <hr />

      <nav>
        <NavLink to={`${url}/cast`}>Cast</NavLink>
        <NavLink to={`${url}/reviews`}>Reviews</NavLink>
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