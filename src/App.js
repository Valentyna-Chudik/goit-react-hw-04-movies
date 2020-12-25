import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePageView from './views/HomePageView/HomePageView';
import MoviePageView from './views/MoviePageView/MoviePageView';
import MovieDetailsView from './views/MovieDetailsPage/MovieDetailsPage';
import NotFoundView from './views/NotFoundView/NotFoundView';

function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <HomePageView></HomePageView>
        </Route>

        <Route exact path="/movies">
          <MoviePageView></MoviePageView>
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsView></MovieDetailsView>
        </Route>

        <Route>
          <NotFoundView></NotFoundView>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
