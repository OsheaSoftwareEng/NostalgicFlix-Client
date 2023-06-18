import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, user, token, updatedUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

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
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
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
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully deleted from favorites');
          setIsFavorite(false);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Card className='h-100 card text-bg-dark mb-3'>
        <Card.Img className='w-100' variant='top' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title> {movie.Title}</Card.Title>{' '}
          <Col>
            {isFavorite ? (
              <AiFillHeart
                className='full-heart'
                color='#ff6b81'
                size={30}
                onClick={removeFavoriteMovie}
              />
            ) : (
              <AiOutlineHeart
                className='outline-heart'
                size={30}
                onClick={addFavoriteMovie}
              />
            )}
          </Col>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='outline-info'>See More</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
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
