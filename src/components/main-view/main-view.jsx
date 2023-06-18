import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
import { NavigationBar } from '../navigation-bar/navigation-bar.jsx';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { UpdateUser } from '../profile-view/update-user.jsx';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //creates state changes for selected movies
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const updatedUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) {
      return;
    }
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
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured.toString()
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        token={token}
        setUser={setUser}
        setToken={setToken}
      />

      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5} className='form-bg-style'>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/users/updateUser'
            element={
              <>
                {user ? (
                  <Col>
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
                  <Col md={5} className='form-bg-style'>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                    <div>
                      <Link to='/signup' style={{ textDecoration: 'none' }}>
                        <Button
                          className='mt-1 d-grid gap-2 col-12 mx-auto'
                          variant='dark'
                          type='submit'
                        >
                          Create New Account
                        </Button>
                      </Link>
                    </div>
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
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={7}>
                    <MovieView
                      movieInfo={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
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
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4' key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          key={movie._id}
                          updatedUser={updatedUser}
                          user={user}
                          token={token}
                        />
                      </Col>
                    ))}
                    {/* <Button
                      className='mt-1 d-grid gap-2 col-7 mx-auto'
                      variant='btn btn-danger'
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button> */}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//   if (!user) {
//     return (
//       <Row className='justify-content-md-center'>
//         <Col md={5} className='form-bg-style'>
//           <LoginView
//             onLoggedIn={(user, token) => {
//               setUser(user);
//               setToken(token);
//             }}
//           />
//           <span>OR</span>
//           <SignupView />
//         </Col>
//       </Row>
//     );
//   }

//   return (
//     <Row className='justify-content-md-center'>
//       {!user ? (
//         <>
//           <LoginView onLoggedIn={(user) => setUser(user)} />
//           or
//           <SignupView />
//         </>
//       ) : selectedMovie ? (
//         <Col md={5}>
//           <MovieView
//             movie={selectedMovie}
//             onBackClick={() => setSelectedMovie(null)}
//           />
//         </Col>
//       ) : movies.length === 0 ? (
//         <div>The list is empty!</div>
//       ) : (
//         <>
//           {movies.map((movie) => (
//             <Col className='mb-5' key={movie.Title} md={3}>
//               <MovieCard
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           ))}
//           <Button
//             className='mt-1 d-grid gap-2 col-7 mx-auto'
//             variant='btn btn-danger'
//             onClick={() => {
//               setUser(null);
//               setToken(null);
//               localStorage.clear();
//             }}
//           >
//             Logout
//           </Button>
//         </>
//       )}
//     </Row>
//   );
// };
