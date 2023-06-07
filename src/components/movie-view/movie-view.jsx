import PropTypes from 'prop-types';
import './movie-view.scss';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

//information for movie information displayed once user clicks a movie
export const MovieView = ({ movieInfo }) => {
  const { movieId } = useParams();
  const Movie = movieInfo.find((movie) => movie._id === movieId);
  return (
    <>
      <Row>
        <Col>
          <div className='ratio ratio-16x9'>
            <iframe
              src='https://www.youtube.com/embed/Ouiy3WUJk-A'
              title='Youtube video'
              allowfullscreen
            >
              {' '}
            </iframe>
          </div>
          {/* <img className='w-100 h-100' src={Movie.ImagePath} /> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Title: </span>
          <span>{Movie.Title}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Genre:</span>
          <span>{Movie.Genre.Name}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Description: </span>
          <span>{Movie.Description}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Director: </span>
          <span>{Movie.Director.Name}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Featured: </span>
          <span>{Movie.Featured}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={`/`}>
            <Button variant='outline-info mt-1'>Back</Button>
          </Link>
        </Col>
        <Col>
          <Link target='_blank' to={movieInfo._id}>
            <Button className='watch-button' variant='outline-danger mt-1'>
              Watch Now
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

//PropType conditions for moviesFromAPI variable return statement in main-view.jsx
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }),
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }),
//     Featured: PropTypes.string.isRequired
//   }).isRequired
// };
