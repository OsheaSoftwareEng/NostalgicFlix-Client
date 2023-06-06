import PropTypes from 'prop-types';
import './movie-view.scss';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

//information for movie information displayed once user clicks a movie
export const MovieView = ({ movie }) => {
  // const { movieId: currentMovieId } = useParams();
  // const movie = movies.find((movie) => movie.id === currentMovieId);
  return (
    <div>
      <div>
        <img className='w-100 h-100' src={movie.ImagePath} />
      </div>
      <div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <Link to={`/`}>
          <Button variant='outline-info mt-1'>Back</Button>
        </Link>
      </div>
    </div>
  );
};

//PropType conditions for moviesFromAPI variable return statement in main-view.jsx
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Featured: PropTypes.string.isRequired
  }).isRequired
};
