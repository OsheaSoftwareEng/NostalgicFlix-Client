import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './navigation-bar.scss';
import Form from 'react-bootstrap/Form';
import navLogo from '../images/logo-nav-png.png';
import { useState } from 'react';
import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavigationBar = ({ user, setUser, setToken, movie }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='md'
        id='nav-bar'
        bg='dark'
        variant='dark'
        className='navbar navbar-expand-lg'
        sticky='top'
      >
        <Container>
          <Navbar.Brand className='flex-grow-1 justify-content-start' href='/'>
            <img
              src={navLogo}
              width='165'
              height='32'
              className='d-inline-block align top d-flex align-items-start'
              alt='nostalgic flix logo'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='flex-grow-1 justify-content-center'>
              <Nav.Link className='nav-text font-style' href='/'>
                Home
              </Nav.Link>
              <Nav.Link
                className='nav-text font-style'
                href='/watchList/favorites'
              >
                WatchList
              </Nav.Link>
              <Nav.Link className='nav-text font-style' href='/users'>
                Profile
              </Nav.Link>
              <Nav.Link
                className='font-style'
                href='#'
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Nav.Link>
              <NavDropdown
                id='nav-dropdown-dark-example drop-styles'
                title='Browse Movies by Genre'
                menuVariant='dark'
              >
                <NavDropdown.Item href='/movies/Comedy'>
                  Comedy
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Romance'>
                  Romance
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Drama'>Drama</NavDropdown.Item>
                <NavDropdown.Item href='/movies/Action'>
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Adventure'>
                  Adventure
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Horror'>
                  Horror
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Sci-Fi'>
                  Sci-Fi
                </NavDropdown.Item>
                <NavDropdown.Item href='/movies/Thriller'>
                  Thriller
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
