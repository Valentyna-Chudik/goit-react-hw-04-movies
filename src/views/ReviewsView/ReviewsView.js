import { useState, useEffect } from 'react';
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
        {reviews && (
          <ul className={styles.list}>
            {reviews.map(review => (
              <li key={review.id}>
                <p className={styles.author}>AUTHOR: {review.author}</p>
                <p className={styles.content}>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
