import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../../logo1.png';

const Navigation = () => (
  <nav className={styles.navigation}>
    <div className={styles.items}>
      <NavLink exact to="/">
        <img src={logo} alt="logo" width="80" className={styles.logo} />
      </NavLink>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Movies
      </NavLink>{' '}
    </div>
  </nav>
);

export default Navigation;
