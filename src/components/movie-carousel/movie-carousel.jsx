import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Container, Card } from 'react-bootstrap';
import './movie-carousel.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import { BsBookmarkHeart } from 'react-icons/bs';
import { BsBookmarkHeartFill } from 'react-icons/bs';

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
              <img className='movie-poster' src={movie.ImagePath} alt='' />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};

{
  /* <Row>
        <Col>
          <h2 className='movie-description-heading mt-1 font-style-bold featured-style'>
            Featured
          </h2>
        </Col>
      </Row>

      {featuredMovie.map((movie) => (
        <Link id='link-style' to={`/movies/${movie._id}`}>
          <img
            className='featured-movies mb-3'
            key={movie.id}
            src={movie.ImagePath}
            height='125'
            width='100'
          />
        </Link>
	  ))} */
}
