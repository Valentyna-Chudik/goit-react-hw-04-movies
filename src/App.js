import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePageView from './views/HomePageView/HomePageView';
import MoviePageView from './views/MoviePageView/MoviePageView';
import MovieDetailsView from './views/MovieDetailsPage/MovieDetailsPage';

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
      </Switch>
      <ToastContainer autoClose={3700} position="top-center" />
    </Container>
  );
}

export default App;
