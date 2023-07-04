import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Card } from 'react-bootstrap';
import './profile-view.scss';
import { FaUserEdit, FaUserLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

export const ProfileView = ({ user, token, movie, updatedUser, loggedOut }) => {
  //function to do a delete request and delete the users account
  const deleteAccount = () => {
    fetch(`https://nostalgic-flix.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          //custom ui alert for a user deleting their account
          Swal.fire({
            title: 'Are you sure you want to delete your account?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your account has been deleted.',
                'success'
              );
              window.location.replace('/login');
              loggedOut();
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Container id='profile-container'>
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
              <Card.Text className='font-style'>
                Birthday: {user.Birthday.slice(0, 10)}
              </Card.Text>
            </Col>
            <Col className='mt-2'>
              <Card.Text className='font-style'>Email: {user.Email}</Card.Text>
            </Col>

            <Col className='mt-2'>
              <Link
                to={`/users/password-update`}
                id='password-link'
                className='pass-edit'
              >
                <FaUserLock size={55} />
              </Link>
              <Link
                to={`/users/password-update`}
                id='password-link'
                className='pass-edit'
              >
                <Card.Text className='font-style'>Update Password</Card.Text>
              </Link>
            </Col>
            <Link to={`/users/updateUser`} className='user-edit'>
              <FaUserEdit size={60} />
            </Link>
            <Link to={`/users/updateUser`} className='user-edit'>
              <span className='edit-user font-style'>Edit All</span>
            </Link>
            <Button
              className='delete-btn font-style'
              variant='btn btn-danger'
              onClick={() => {
                deleteAccount();
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
