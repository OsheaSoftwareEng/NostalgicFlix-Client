import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdEmail } from 'react-icons/md';
import Swal from 'sweetalert2';
import './forgot-password.scss';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    var data = {
      Email: email
    };

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    axios
      .post(`https://nostalgic-flix.herokuapp.com/forgot-password`, {
        Email: email
      })
      .then((user) => {
        if (user) {
          console.log(user);
          Toast.fire({
            icon: 'success',
            title: 'Email Sent! Check spam if not in inbox'
          });
          setTimeout(function () {
            window.location.replace('/login');
          }, 4000);
        } else if (!user) {
          Toast.fire({
            icon: 'error',
            title: 'User does not exist'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'User does not exist'
        });
      });
  };

  return (
    <Form
      className='mx-auto'
      id='box-forget-pass'
      onSubmit={handleSubmitUpdate}
    >
      <Container>
        <div id='form-update-user' className=''>
          <h2 className='mb-5'>Request New Password</h2>
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
          <Button
            className='mt-4 col-9'
            variant='btn btn-success'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </Container>
    </Form>
  );
};
