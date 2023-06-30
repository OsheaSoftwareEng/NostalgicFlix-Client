import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillLock } from 'react-icons/ai';
import './password-update.scss';
import Swal from 'sweetalert2';

export const PasswordUpdate = ({ user, token, updatedUser, loggedOut }) => {
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    if (password === controlPassword) {
      var data = {
        Username: user.Username,
        Password: password,
        Email: user.Email,
        Birthday: user.Birthday
      };
    } else {
      Toast.fire({
        icon: 'error',
        title: "sorry passwords don't match try again"
      });
      return;
    }

    fetch(`https://nostalgic-flix.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Toast.fire({
            icon: 'error',
            title: 'failed trying to change settings'
          });
          return false;
        }
      })
      .then((user) => {
        if (user) {
          Toast.fire({
            icon: 'success',
            title: 'Password updated'
          });
          setTimeout(function () {
            loggedOut();
            window.location.replace('/login');
          }, 2000);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Form
      className='mx-auto'
      id='box-update-user'
      onSubmit={handleSubmitUpdate}
    >
      <div id='form-update-user' className='mb-2 mt-2'>
        <h2 className='mb-5'>Update Password</h2>
        <Form.Group controlId='formNewPassword'>
          <InputGroup>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
            />
            <InputGroup.Text id='input-style-update-user'>
              <AiFillLock size={25} className='user-icon' />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formControlPassword'>
          <Form.Label></Form.Label>
          <InputGroup>
            <Form.Control
              type='password'
              value={controlPassword}
              onChange={(e) => setControlPassword(e.target.value)}
              placeholder=' Confirm Password'
            />
            <InputGroup.Text id='input-style-update-user'>
              <AiFillLock size={25} className='user-icon' />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button className='mt-4 col-9' variant='btn btn-success' type='submit'>
          Save
        </Button>
        <Link to={'/users'} className='link-style-update-user'>
          Back to Profile
        </Link>
      </div>
    </Form>
  );
};
