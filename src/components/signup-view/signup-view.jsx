import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import './signup-view.scss';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillLock } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import Swal from 'sweetalert2';

//state declarations for username,password,email and birthday and setState to store values inputted
export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  //allows users to signup for application
  const handleSubmit = (event) => {
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
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };
    } else {
      Toast.fire({
        icon: 'error',
        title: "sorry passwords don't match try again"
      });
      return;
    }

    fetch('https://nostalgic-flix.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Signup successful please login'
        });
        setTimeout(function () {
          window.location.replace('/login');
        }, 2000);
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Signup failed'
        });
      }
    });
  };

  //returns a signup form
  return (
    <Form id='box-signup' onSubmit={handleSubmit}>
      <div id='form-signup'>
        <h2 className='font-style signup-header'>Signup</h2>
        <Container id='form-position'>
          <Form.Group controlId='formUsername'>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength='7'
                placeholder='Username'
              />
              <InputGroup.Text id='input-style-signup'>
                <BsFillPersonFill size={25} className='user-icon' />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength='10'
                placeholder='Password'
              />
              <InputGroup.Text id='input-style-signup'>
                <AiFillLock size={25} className='user-icon' />
              </InputGroup.Text>
              <Form.Group controlId='formControlPassword'>
                <Form.Label></Form.Label>
                <InputGroup>
                  <Form.Control
                    type='password'
                    value={controlPassword}
                    onChange={(e) => setControlPassword(e.target.value)}
                    placeholder=' Confirm Password'
                    minLength='10'
                  />
                  <InputGroup.Text id='input-style-update-user'>
                    <AiFillLock size={25} className='user-icon' />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
              <InputGroup.Text id='input-style-signup'>
                <MdEmail size={25} className='user-icon' />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='formBirthday'>
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control
                type='date'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                placeholder='Birthday'
              />
              <InputGroup.Text id='input-style-signup'>
                <FaBirthdayCake size={25} className='user-icon' />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            className='mt-3 col-10 font-style'
            variant='btn btn-success'
            type='submit'
          >
            Create new account
          </Button>
        </Container>
        <Link to={'/login'} className='link-style-signup font-style'>
          Already a member?
        </Link>
      </div>
    </Form>
  );
};
