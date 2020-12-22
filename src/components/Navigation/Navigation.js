import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink to="/movies">Movies</NavLink>
    <hr />
  </nav>
);

export default Navigation;
