import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie }) => {
  return (
    <Card className='h-100 card text-bg-dark mb-3'>
      <Card.Img className='w-100' variant='top' src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant='outline-info'>See More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};
