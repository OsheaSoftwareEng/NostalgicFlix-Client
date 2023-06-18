import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

export const NavigationBar = ({ user, setUser, setToken }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar bg='info' variant='info'>
        <Container>
          <Navbar.Brand href='/'></Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/users'>Profile</Nav.Link>
            <Nav.Link
              href='#'
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
