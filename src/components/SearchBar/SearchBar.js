import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
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
