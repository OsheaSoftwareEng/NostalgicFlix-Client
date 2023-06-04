import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //creates state changes for selected movies
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //
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
            _id: movie.id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
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

  if (!user) {
    return (
      <Row className='justify-content-md-center'>
        <Col md={5} className='form-bg-style'>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <span>OR</span>
          <SignupView />
        </Col>
      </Row>
    );
  }

  //this returns a login view making the user have to login in before being able to use the application.

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </>
      ) : selectedMovie ? (
        <Col md={3}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie.Title} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button
            variant='danger'
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
};

//statement for movies selected to show movie view details and includes code for when clicking the back button to go to list of movies.

//   if (selectedMovie) {
//     return (
//       <MovieView
//         movie={selectedMovie}
//         onBackClick={() => setSelectedMovie(null)}
//       />
//     );
//   }
//   //if theres no movies in the array the page will say the list is empty
//   if (movies.length === 0) {
//     return <div>The list is empty!</div>;
//   }

//   //return statement for movies in the array being displayed and being clickable from MovieCard file
//   return (
//     <div>
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.Title}
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       ))}
