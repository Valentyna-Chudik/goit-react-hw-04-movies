import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styles from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.warning(`Please enter your query.`);
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
          className={styles.searchFormInput}
        />
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
