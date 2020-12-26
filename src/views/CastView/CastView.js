import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as movieAPI from '../../services/movie-api';
import styles from './CastView.module.css';
import defaultImg from '../../noPhoto.jpg';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    movieAPI.fetchMovieCredits(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <>
      <div className={styles.container}>
        {cast && (
          <ul className={styles.list}>
            {cast.map(cast => (
              <li key={cast.id} className={styles.item}>
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w300/${cast.profile_path}`
                      : defaultImg
                  }
                  alt={cast.name}
                  className={styles.image}
                />
                <p className={styles.name}>{cast.name}</p>
                <p className={styles.character}>{cast.character}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

CastView.propTypes = {
  movieId: PropTypes.string.isRequired,
};
