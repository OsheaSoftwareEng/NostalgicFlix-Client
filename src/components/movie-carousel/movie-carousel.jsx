import { Row, Col, Container, Card } from 'react-bootstrap';
import './movie-carousel.scss';
import { Link } from 'react-router-dom';
import React from 'react';

export const MovieCarousel = ({ movie }) => {
  const featuredMovie = movie.filter((movie) => (movie.Featured ? true : null));

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2 className='movie-featured-heading mt-2 font-style-bold'>
              Featured Movies
            </h2>
          </Col>
        </Row>

        <div className='row-posters'>
          {featuredMovie.map((movie) => (
            <Link id='link-style' to={`/movies/${movie._id}`}>
              <img className='movie-carousel' src={movie.ImagePath} alt='' />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};
