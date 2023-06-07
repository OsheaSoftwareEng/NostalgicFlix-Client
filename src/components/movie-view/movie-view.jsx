import PropTypes from 'prop-types';
import './movie-view.scss';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

//information for movie information displayed once user clicks a movie
export const MovieView = ({ movieInfo }) => {
  const { movieId } = useParams();
  const Movie = movieInfo.find((movie) => movie._id === movieId);
  return (
    <>
      <Row>
        <Col>
          <span className='title-style'>{Movie.Title}</span>
          <div className='ratio ratio-16x9'>
            <ReactPlayer
              url={Movie.MovieEmbed}
              playing={true}
              volume={0}
              controls={true}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Release Date: </span>
          <span>{Movie.ReleaseDate}</span>
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
          <span>Actors: </span>
          <span>{Movie.Actors}</span>
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
          <a href={Movie.MovieWatch} target='blank'>
            <Button className='watch-button' variant='outline-danger mt-1'>
              Watch Now
            </Button>
          </a>
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
