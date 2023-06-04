import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100 card text-bg-dark mb-3'>
      <Card.Img className='w-100' variant='top' src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button
          className='open-button'
          onClick={() => onMovieClick(movie)}
          variant='outline-info'
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
