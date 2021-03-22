import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as movieAPI from '../../services/movie-api';
import styles from './ReviewView.module.css';

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(true);
  // Also, 'react-simple-show-more' package can be used

  useEffect(() => {
    movieAPI.fetchMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  const getContent = content => {
    return content.length > 500 ? content.slice(0, 500) + '...' : content;
  };

  const toggleShowMore = () => {
    setShowMore(state => !state);
  };

  return (
    <>
      <div className={styles.container}>
        {reviews.length > 0 ? (
          <ul className={styles.list}>
            {reviews.map(review => (
              <li key={review.id} className={styles.item}>
                <p className={styles.author}>AUTHOR: {review.author}</p>
                <p className={styles.content}>
                  {showMore ? getContent(review.content) : review.content}
                  {review.content.length > 500 && (
                    <span className={styles.showMore} onClick={toggleShowMore}>
                      {' '}
                      {showMore ? 'Show More >>' : 'Show Less <<'}
                    </span>
                  )}
                </p>
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
