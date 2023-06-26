import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Badge, Col, Row } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Container } from 'react-bootstrap';
import { BsBookmarkHeart } from 'react-icons/bs';
import { BsBookmarkHeartFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, user, token, updatedUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

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
          Toast.fire({
            icon: 'success',
            title: `${movie.Title} has been added to your Watchlist'`
          });
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
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
          Toast.fire({
            icon: 'success',
            title: `${movie.Title} has been removed from your Watchlist'`
          });
          return response.json();
        } else {
          Toast.fire({
            icon: 'error',
            title: `${Movie.Title} could not be added to your favorites'`
          });
          return false;
        }
      })
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
              <AiFillHeart
                className='full-heart move-heart'
                color='#ff6b81'
                size
                onClick={removeFavoriteMovie}
              />
            ) : (
              <AiOutlineHeart
                className='outline-heart move-heart'
                size
                onClick={addFavoriteMovie}
              />
            )}
          </div>
          <Link id='link-style' to={`/movies/${movie._id}`}>
            <img className='title-poster' src={movie.ImagePath} alt='' />
          </Link>
        </Col>
      </Row>
    </Container>
    // <>
    //   <Container id='container-adjust' className='mt-3 h-100 container-adjust'>
    //     <Card className='h-100 card text-bg-dark'>
    //       <Link id='link-style' to={`/movies/${movie._id}`}>
    //         <Card.Img
    //           id='image-styles'
    //           className='w-100'
    //           variant='top'
    //           src={movie.ImagePath}
    //         />
    //       </Link>
    //       <Card.Body>
    //         <Container>
    //           <Row>
    //             <Col>
    //               <Badge
    //                 id='badge-style'
    //                 className='badge-style rating-styles font-style'
    //                 bg=''
    //               >
    //                 {movie.Rating}
    //               </Badge>
    //               <Badge
    //                 id='badge-style2'
    //                 className='badge-style rating-styles font-style'
    //                 bg=''
    //               >
    //                 {movie.Genre.Name}
    //               </Badge>

    //               {isFavorite ? (
    //                 <BsBookmarkHeartFill
    //                   className='full-heart move-heart'
    //                   color='#ff6b81'
    //                   size
    //                   onClick={removeFavoriteMovie}
    //                 />
    //               ) : (
    //                 <BsBookmarkHeart
    //                   className='outline-heart move-heart'
    //                   color='#ff0000'
    //                   size
    //                   onClick={addFavoriteMovie}
    //                 />
    //               )}
    //             </Col>
    //           </Row>
    //           <Container>
    //             <Link id='link-style' to={`/movies/${movie._id}`}>
    //               <div className='border-t '></div>
    //               <Card.Title className='font-style' id='movie-title'>
    //                 {movie.Title}
    //               </Card.Title>
    //               <div className='border-b '></div>
    //             </Link>

    //             <Col>
    //               <Card.Title className='font-style' id='release-date'>
    //                 {movie.ReleaseDate}
    //               </Card.Title>
    //             </Col>
    //           </Container>
    //         </Container>
    //       </Card.Body>
    //     </Card>
    //   </Container>
    // </>
  );
};

// PropTypes conditions for return MovieCard statement in main-view.jsx
//   MovieCard.propTypes = {
//     movie: PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }).isRequired
//   };
// };
