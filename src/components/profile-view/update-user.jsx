import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UpdateUser = (user, token, updatedUser) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

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
          alert('Something went wrong');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('Account updated');
          updatedUser(user);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Form onSubmit={handleSubmitUpdate}>
      <Form.Group controlId='formUsername'>
        <Form.Label className='form-style'>Username:</Form.Label>
        <Form.Control
          className='form-style'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength='3'
          required
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label className='form-style'>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label className='form-style'>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formBirthday'>
        <Form.Label className='form-style'>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        className='mt-1 d-grid gap-2 col-12 mx-auto'
        variant='outline-info'
        type='submit'
      >
        Submit
      </Button>
      <Link to={`/users`} style={{ textDecoration: 'none' }}>
        <Button
          className='mt-1 d-grid gap-2 co l-12 mx-auto'
          variant='dark'
          type='submit'
        >
          Back to profile
        </Button>
      </Link>
    </Form>
  );
};
