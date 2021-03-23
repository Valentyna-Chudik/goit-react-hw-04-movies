import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';
import BackToTop from './components/BackToTop/BackToTop';

const HomePageView = lazy(() =>
  import(
    './views/HomePageView/HomePageView.js' /* webpackChunkName: "home-page-view" */
  ),
);
const MoviePageView = lazy(() =>
  import(
    './views/MoviePageView/MoviePageView.js' /* webpackChunkName: "movie-page-view" */
  ),
);

const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <ToastContainer autoClose={3700} position="top-center" />
      <BackToTop />
    </Container>
  );
}

export default App;
