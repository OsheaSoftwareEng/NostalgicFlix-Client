import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsBookmarkPlusFill, BsBookmarkPlus } from 'react-icons/bs';
import Swal from 'sweetalert2';

export const MovieCard = ({ movie, user, token, updatedUser }) => {
  //custom alerts when a users does an action
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

  //state that saves favorite movies to users favorite movies array
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  //add favorite movies function for users to add movies to favorites
  const addFavoriteMovie = () => {
    fetch(
      `https://nostalgic-flix.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          //custom alert when user successfully adds movie to favorites
          Toast.fire({
            icon: 'success',
            title: `${movie.Title} has been added to your Watchlist'`
          });
          return response.json();
        } else {
          //custom alert when response fails to add movie to favorites
          Toast.fire({
            icon: 'error',
            title: `${Movie.Title} could not be added to your favorites'`
          });
          return false;
        }
      })
      //if movie added is successful it saves the movie to favorite state and updates the users favorites list
      .then((user) => {
        if (user) {
          setIsFavorite(true);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  //remove favorite movies function for users to remove movies to favorites
  const removeFavoriteMovie = () => {
    fetch(
      `https://nostalgic-flix.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          //custom alert when user removes adds movie to favorites
          Toast.fire({
            icon: 'success',
            title: `${movie.Title} has been removed from your Watchlist'`
          });
          return response.json();
        } else {
          //custom alert when response fails to remove movie to favorites
          Toast.fire({
            icon: 'error',
            title: `${Movie.Title} could not be removed to your favorites'`
          });
          return false;
        }
      })
      //if movie removed is successful it removes the movie from  the favorite movie state and updates the users favorites list
      .then((user) => {
        if (user) {
          setIsFavorite(false);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div>
            {isFavorite ? (
              <BsBookmarkPlusFill
                className='full-bookmark move-bookmark'
                color='#ff6b81'
                size
                onClick={removeFavoriteMovie}
              />
            ) : (
              <BsBookmarkPlus
                className='outline-bookmark move-bookmark'
                size
                onClick={addFavoriteMovie}
              />
            )}
          </div>
          <Link id='link-style' to={`/movies/${movie._id}`}>
            <img className='movie-poster' src={movie.ImagePath} alt='' />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
