import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './watch-list.scss';

export const WatchList = ({ user, token, movie, updatedUser }) => {
  let result = movie.filter((movie) => user.FavoriteMovies.includes(movie._id));

  return (
    <>
      <Row>
        {result.map((movie) => (
          <Col className='mb-4' md={3}>
            <MovieCard
              movie={movie}
              user={user}
              updatedUser={updatedUser}
              token={token}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
