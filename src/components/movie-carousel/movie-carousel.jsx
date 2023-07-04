import { Row, Col, Container, Card } from 'react-bootstrap';
import './movie-carousel.scss';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

export const MovieCarousel = ({ movie }) => {
  const featuredMovie = movie.filter((movie) => (movie.Featured ? true : null));
  const [current, setCurrent] = useState(0);
  const movieLength = featuredMovie.length;

  //sets index
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= movieLength) {
      newIndex = movieLength - 1;
    }
    setCurrent(newIndex);
  };

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
          <HiOutlineArrowSmLeft
            size={45}
            className='left-arrow'
            onClick={() => {
              updateIndex(current - 1);
            }}
          />
          <HiOutlineArrowSmRight
            size={45}
            className='right-arrow'
            onClick={() => {
              updateIndex(current + 2);
            }}
          />
          {featuredMovie.map((movie, index) => (
            <div style={{ transform: `translateX(-${current * 82}%)` }}>
              <Link key={index} id='link-style' to={`/movies/${movie._id}`}>
                <img
                  //width calculated based off the number of photos in featured one photo 100% width 38 photos 100*38 = 2.63
                  height='true'
                  className='movie-carousel'
                  src={movie.ImagePath}
                  alt={movie.Title}
                  width={'150'}
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
