import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import './update-user.scss';
import Swal from 'sweetalert2';

export const UpdateUser = ({ user, token, updatedUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

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
            title: 'Settings updated'
          });
          setTimeout(function () {
            window.location.replace('/users');
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
      <div id='form-update-user'>
        <h2>Update Info</h2>
        <Form.Group controlId='formNewPassword'>
          <Form.Label></Form.Label>
          <InputGroup>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength='7'
              placeholder='Username'
            />
            <InputGroup.Text id='input-style-update-user'>
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
              placeholder='Password'
            />
            <InputGroup.Text id='input-style-update-user'>
              <AiFillLock size={25} className='user-icon' />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label></Form.Label>
          <InputGroup>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <InputGroup.Text id='input-style-update-user'>
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
              placeholder='Birthday'
            />
            <InputGroup.Text id='input-style-update-user'>
              <FaBirthdayCake size={25} className='user-icon' />
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
//     <Form onSubmit={handleSubmitUpdate}>
//       <Form.Group controlId='formUsername'>
//         <Form.Label className='form-style'>Username:</Form.Label>
//         <Form.Control
//           className='form-style'
//           type='text'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           minLength='3'
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId='formPassword'>
//         <Form.Label className='form-style'>Password:</Form.Label>
//         <Form.Control
//           type='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId='formEmail'>
//         <Form.Label className='form-style'>Email:</Form.Label>
//         <Form.Control
//           type='email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId='formBirthday'>
//         <Form.Label className='form-style'>Birthday:</Form.Label>
//         <Form.Control
//           type='date'
//           value={birthday}
//           onChange={(e) => setBirthday(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Button
//         className='mt-1 d-grid gap-2 col-12 mx-auto'
//         variant='outline-info'
//         type='submit'
//       >
//         Submit
//       </Button>
//       <Link to={`/users`} style={{ textDecoration: 'none' }}>
//         <Button
//           className='mt-1 d-grid gap-2 col-12 mx-auto'
//           variant='dark'
//           type='submit'
//         >
//           Back to profile
//         </Button>
//       </Link>
//     </Form>
//   );
// };
