import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import './main-view.scss';
import { NavigationBar } from '../navigation-bar/navigation-bar.jsx';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { UpdateUser } from '../profile-view/update-user.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Spinner } from '../spinner/spinner.jsx';
import logo from '../images/logo-png.png';
import { WatchList } from '../watch-list/watch-list.jsx';
import { MovieCarousel } from '../movie-carousel/movie-carousel.jsx';
import { PasswordUpdate } from '../profile-view/password-update/password-update.jsx';

export const MainView = () => {
  //keeps stored information for user with localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  //state put movies from API into an array
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  //keeps track of tokens once a user logs in and stores it in storedToken state
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //updates users state by taking users actions and putting them in setUser and then updating the new information to the users state
  const updatedUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const comedySearch = movies.filter((movie) => movie.Genre.Name === 'Comedy');
  const romanceSearch = movies.filter(
    (movie) => movie.Genre.Name === 'Romance'
  );
  const actionSearch = movies.filter((movie) => movie.Genre.Name === 'Action');
  const dramaSearch = movies.filter((movie) => movie.Genre.Name === 'Drama');
  const crimeSearch = movies.filter((movie) => movie.Genre.Name === 'Crime');
  const scifiSearch = movies.filter((movie) => movie.Genre.Name === 'Sci-Fi');
  const horrorSearch = movies.filter((movie) => movie.Genre.Name === 'Horror');
  const thrillerSearch = movies.filter(
    (movie) => movie.Genre.Name === 'Thriller'
  );
  const adventureSearch = movies.filter((movie) => movie.Genres == 'Adventure');

  useEffect(() => {
    if (!token) {
      return;
    }

    //fetch for movies backend API
    fetch('https://nostalgic-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            MovieEmbed: movie.Movie_Embed,
            Actors: movie.Actors,
            ReleaseDate: movie.Release_Date,
            MovieLength: movie.Movie_Length,
            MovieWatch: movie.Movie_Watch,
            Rating: movie.Rating,
            Writers: movie.Writers,
            Genres: movie.Genres,

            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      {!user ? (
        <Col className='d-flex justify-content-center'>
          <img id='logo' src={logo} alt='' />
        </Col>
      ) : (
        <NavigationBar
          user={user}
          token={token}
          setUser={setUser}
          setToken={setToken}
          movie={movies}
        />
      )}
      <Container>
        <Row className='justify-content-md-center'>
          <Routes>
            <Route
              path='/signup'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col className='d-flex justify-content-center'>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/users/:userName'
              element={
                <>
                  {user ? (
                    <Col>
                      <Navigate to='/users/updateInfo' />
                      <UpdateUser
                        user={user}
                        token={token}
                        updatedUser={updatedUser}
                      />
                    </Col>
                  ) : (
                    <Navigate to='/login' replace />
                  )}
                </>
              }
            />

            <Route
              path='/users/password-update'
              element={
                <>
                  {user ? (
                    <Col>
                      <PasswordUpdate
                        user={user}
                        token={token}
                        updatedUser={updatedUser}
                        loggedOut={() => {
                          setUser(null);
                          setMovies(null);
                          localStorage.clear();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to='/login' replace />
                  )}
                </>
              }
            />

            <Route
              path='/movies/Comedy'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Comedy Movies
                      </h2>
                      {comedySearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Romance'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Romance Movies
                      </h2>
                      {romanceSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Action'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Action Movies
                      </h2>
                      {actionSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Drama'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Drama Movies
                      </h2>
                      {dramaSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Thriller'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Thriller Movies
                      </h2>
                      {thrillerSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Horror'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Horror Movies
                      </h2>
                      {horrorSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Adventure'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Adventure Movies
                      </h2>
                      {adventureSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/movies/Sci-Fi'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} />
                      </Col>
                      <h2 className='movie-featured-heading mt-2 font-style-bold'>
                        Sci-Fi Movies
                      </h2>
                      {scifiSearch.map((movie) => (
                        <Col sm={3} className='mb-4' key={movie._id}>
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route
              path='/watchList/favorites'
              element={
                <>
                  {user ? (
                    <Row>
                      <Col>
                        <h2 className='movie-featured-heading mt-2 font-style-bold'>
                          WatchList Movies
                        </h2>
                        <WatchList
                          user={user}
                          token={token}
                          movie={movies}
                          updatedUser={updatedUser}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Navigate to='/login' replace />
                  )}
                </>
              }
            />
            <Route
              path='/users'
              element={
                <>
                  {user ? (
                    <Col>
                      <ProfileView
                        loggedOut={() => {
                          setUser(null);
                          setMovies(null);
                          localStorage.clear();
                        }}
                        user={user}
                        token={token}
                        movie={movies}
                        updatedUser={updatedUser}
                      />
                    </Col>
                  ) : (
                    <Navigate to='/login' replace />
                  )}
                </>
              }
            />
            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col className='d-flex justify-content-center'>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <Col xs={10} sm={9}>
                      <MovieView
                        movieInfo={movies}
                        key={movies._id}
                        user={user}
                        token={token}
                        movie={movies}
                        updatedUser={updatedUser}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col className='spinner'>
                      {<Spinner className='spinner-pos' />}
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <MovieCarousel movie={movies} user={user} />
                      </Col>
                      {movies.map((movie) => (
                        <Col
                          xs={6}
                          sm={4}
                          md={2}
                          className='mb-2'
                          key={movie._id}
                        >
                          <MovieCard
                            movie={movie}
                            key={movie._id}
                            updatedUser={updatedUser}
                            user={user}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
