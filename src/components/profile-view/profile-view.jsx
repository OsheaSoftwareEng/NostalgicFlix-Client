import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Card } from 'react-bootstrap';
import './profile-view.scss';
import { FaUserEdit } from 'react-icons/fa';

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
      <div className='mx-auto' id='box-profile-view'>
        <div id='form-signup'>
          <Card.Title className='font-style' id='settings-heading'>
            Settings
          </Card.Title>
          <Col className='mt-2'>
            <Card.Text className='font-style'>
              Username: {user.Username}
            </Card.Text>
          </Col>
          <Col className='mt-2'>
            <Card.Text className='font-style'>Email: {user.Email}</Card.Text>
          </Col>
          <Col className='mt-2'>
            <Card.Text className='font-style'>Password: *****</Card.Text>
          </Col>
          <Col className='mt-2'>
            <Card.Text className='font-style'>
              Birthday: {user.Birthday.slice(0, 10)}
            </Card.Text>
          </Col>
          <Link to={`/users/updateUser`} className='user-edit'>
            <FaUserEdit size={60} />
          </Link>
          <Link to={`/users/updateUser`} className='user-edit'>
            <span className='edit-user font-style'>Edit</span>
          </Link>
          <Button
            className='delete-btn font-style'
            variant='btn btn-danger'
            onClick={() => {
              if (confirm('Area you sure')) {
                deleteAccount();
              }
            }}
          >
            Delete Account
          </Button>
        </div>
      </div>
      <Row>
        <Col className='favorites-heading'>Favorite Movies:</Col>
      </Row>
      <Row>
        {result.map((movie) => (
          <Col className='mb-4' md={3}>
            <MovieCard
              movie={movie}
              user={user}
              updatedUser={updatedUser}
              token={token}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

{
  /* <div> Username: {user.Username}</div>
      <div> Email: {user.Email}</div>
      <div>Birthday: {user.Birthday.slice(0, 10)}</div>
      <Link to={`/users/updateUser`}>
        {' '}
        <Button id='btn-outline-profile'>Update Info</Button>{' '}
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
            <MovieCard
              movie={movie}
              user={user}
              updatedUser={updatedUser}
              token={token}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}; */
}
