import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './login-view.scss';
import { BsFillPersonFill } from 'react-icons/bs';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillLock } from 'react-icons/ai';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

    const data = {
      Username: username,
      Password: password
    };

    fetch('https://nostalgic-flix.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: "User doesn't exist"
          });
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Container className=' d-flex justify-content-center'>
        <Form id='box-login' onSubmit={handleSubmit}>
          <div id='form-login'>
            <h2 className='font-style'>Login</h2>
            <Form.Group controlId='formUsername'>
              <Form.Label></Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength='3'
                  placeholder='Username'
                />
                <InputGroup.Text id='input-style-login'>
                  <BsFillPersonFill size={25} className='user-icon' />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId='formPassword'>
              <Form.Label></Form.Label>
              <InputGroup>
                <Form.Control
                  id=''
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='Password'
                />
                <InputGroup.Text id='input-style-login'>
                  <AiFillLock size={25} className='user-icon' />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button
              id='btn-login-nf'
              className='mt-2 col-10 font-style'
              type='submit'
            >
              Log In
            </Button>
            <Row>
              <Col>
                <Link
                  to={'/forgot-password'}
                  className='link-style-signup font-style forgot-pass'
                >
                  Forgot Password?
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className='mt-3'>
                <span className='font-style '>Not a member?</span>{' '}
                <Link to={'/signup'} className='link-style-login font-style'>
                  Signup
                </Link>
              </Col>
            </Row>
          </div>
        </Form>
      </Container>
    </>
  );
};
