import { useState, useEffect } from 'react';
import * as movieAPI from '../services/movie-api';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    movieAPI.fetchMovieCredits(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(cast => (
            <li key={cast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                alt={cast.name}
                width={300}
              />
              <p>{cast.name}</p>
              <p>{cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
