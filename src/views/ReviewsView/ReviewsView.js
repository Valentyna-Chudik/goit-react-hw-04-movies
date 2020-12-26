import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as movieAPI from '../../services/movie-api';
import styles from './ReviewView.module.css';

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieAPI.fetchMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  return (
    <>
      <div className={styles.container}>
        {reviews.length > 0 ? (
          <ul className={styles.list}>
            {reviews.map(review => (
              <li key={review.id} className={styles.item}>
                <p className={styles.author}>AUTHOR: {review.author}</p>
                <p className={styles.content}>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.text}>There are no reviews for this movie.</p>
        )}
      </div>
    </>
  );
}

ReviewsView.propTypes = {
  movieId: PropTypes.string.isRequired,
};
