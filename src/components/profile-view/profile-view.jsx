import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Button } from 'react-bootstrap';

export const ProfileView = ({ user, token, movie, updatedUser, loggedOut }) => {
  let result = movie.filter((movie) => user.FavoriteMovies.includes(movie._id));

  const deleteAccount = () => {
    fetch(`https://nostalgic-flix.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          alert('your account has been successfully deleted');
          loggedOut();
        } else {
          alert('sorry something went wrong');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div> Username: {user.Username}</div>
      <div> Email: {user.Email}</div>
      <div>Birthday: {user.Birthday}</div>
      <Link to={`/users/updateUser`}>
        {' '}
        <Button variant='outline-info'>Update Info</Button>{' '}
      </Link>
      <Button
        variant='outline-danger'
        onClick={() => {
          if (confirm('Area you sure')) {
            deleteAccount();
          }
        }}
      >
        Delete Account
      </Button>

      <Row>
        <Col className='fs-3'>Favorite Movies:</Col>
      </Row>
      <Row>
        {result.map((movie) => (
          <Col className='mb-4' md={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
