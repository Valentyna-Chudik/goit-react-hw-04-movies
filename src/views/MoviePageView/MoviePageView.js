// import PageHeading from '../components/PageHeading/PageHeading';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as movieAPI from '../../services/movie-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import defaultImg from '../../noPoster.png';
import styles from '../HomePageView/HomePageView.module.css';

export default function MoviePageView() {
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    movieAPI.fetchMovie(query).then(({ results }) => {
      if (results.length === 0) {
        toast.error(`No results were found for ${query}!`);
        return;
      }
      setMovies(results);
    });
  }, [query]);

  // useEffect(() => {
  //   if (!query) {
  //     return;
  //   }

  //   movieAPI.fetchMovie(query).then(data => {
  //     if (results.length === 0) {
  //       toast.info(`Sorry, there are no matching results for ${query}!`);
  //       return;
  //     }
  //     setMovies(data.results);
  //   });
  // }, [query]);

  const onChangeQuery = query => {
    setQuery(query);
    setMovies([]);
  };

  return (
    <>
      {/* <PageHeading text="Movie name" /> */}
      <SearchBar onSubmit={onChangeQuery} />

      {movies && (
        <div className={styles.container}>
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.item}>
                <Link to={`${url}/${movie.id}`}>
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
    </>
  );
}
