import './movie-view.scss';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { BsBookmarkHeart } from 'react-icons/bs';
import { BsBookmarkHeartFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

//information for movie information displayed once user clicks a movie
export const MovieView = ({ movieInfo, movie, token, user, updatedUser }) => {
  const { movieId } = useParams();
  const Movie = movieInfo.find((movie) => movie._id === movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const similarMovies = movie.filter((m) => m.Genre.Name === m.Genre.Name);

  const [Favorite, setFavorite] = useState(
    user.FavoriteMovies.includes(Movie._id)
  );

  const addFavorite = () => {
    fetch(
      `https://nostalgic-flix.herokuapp.com/users/${user.Username}/movies/${Movie._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          Toast.fire({
            icon: 'success',
            title: `${Movie.Title} has been added to your Watchlist'`
          });
          return response.json();
        } else {
          Toast.fire({
            icon: 'error',
            title: `${Movie.Title} could not be added to your Watchlist'`
          });
          return false;
        }
      })
      .then((user) => {
        if (user) {
          setFavorite(true);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  const removeFavorite = () => {
    fetch(
      `https://nostalgic-flix.herokuapp.com/users/${user.Username}/movies/${Movie._id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          Toast.fire({
            icon: 'success',
            title: `${Movie.Title} has been removed from your Watchlist'`
          });
          return response.json();
        } else {
          Toast.fire({
            icon: 'error',
            title: 'something went wrong'
          });
          return false;
        }
      })
      .then((user) => {
        if (user) {
          setFavorite(false);
          updatedUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Container>
        <Container fluid id='movie-view-section-top' className=''>
          <Row>
            <Col className='col-md-9'>
              <h1 className='title-style font-style-bold'>{Movie.Title}</h1>
              {Favorite ? (
                <BsBookmarkHeartFill
                  className='full-heart move-heart-mv'
                  color='#ff6b81'
                  size
                  onClick={removeFavorite}
                />
              ) : (
                <BsBookmarkHeart
                  className='outline-heart move-heart-mv'
                  size
                  onClick={addFavorite}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className='movie-stats font-style'>
                {Movie.ReleaseDate} · {Movie.Rating} · {Movie.MovieLength}
              </span>
            </Col>
          </Row>
          <Row>
            <Col fluid className='col-xs-7 col-sm-3 col-md-3'>
              <div className='col-xs-5'>
                <Link id='link-style' to={`/movies/${movie._id}`}>
                  <img id='movie-image' src={Movie.ImagePath} alt='' />
                </Link>
              </div>
            </Col>
            <Col fluid className='col-sm-9 col-md-9'>
              <div id='react-move' className='player-wrapper'>
                <ReactPlayer
                  className='react-player'
                  url={Movie.MovieEmbed}
                  playing={true}
                  volume={0}
                  controls={true}
                  width='100%'
                  height='100%'
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Container id='movie-view-section-bottom' className=''>
          <Container className='h-100' id='movie-description-section-bottom'>
            <Row>
              <Col>
                <h2 className='movie-description-heading mt-1 font-style-bold'>
                  Storyline
                </h2>
              </Col>
            </Row>
            <Row>
              <Col className='mb-2 pb-3'>
                <span className='movie-description-styles font-style p-3'>
                  {Movie.Description}
                </span>
              </Col>
            </Row>
            <div className='border-top'></div>
            <Col className='pt-2 pb-2'>
              <span className='movie-description-styles font-style-bold p-1'>
                Director{' '}
              </span>
              <span className='movie-description-styles-name font-style-i'>
                {Movie.Director.Name}
              </span>
            </Col>
            <div className='border-top'></div>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-description-styles font-style-bold p-1'>
                  Writers{' '}
                </span>
                <span className='movie-description-styles-name font-style-i'>
                  {Movie.Writers[0]} · {Movie.Writers[1]} {Movie.Writers[2]}
                  {Movie.Writers[3]}
                </span>
              </Col>
              <div className='border-top'></div>
            </Row>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-description-styles font-style-bold p-1'>
                  Stars{' '}
                </span>
                <span className='movie-description-styles-name font-style-i'>
                  {Movie.Actors[0]} · {Movie.Actors[1]} · {Movie.Actors[2]}{' '}
                  {Movie.Actors[3]}
                </span>
              </Col>
              <div className='border-top'></div>
            </Row>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-description-styles font-style-bold p-1'>
                  Genres{' '}
                </span>
                <span className='movie-description-styles-name font-style-i'>
                  {Movie.Genres[0]} · {Movie.Genres[1]}
                </span>
              </Col>
              <div className='border-top pb-3'></div>
            </Row>
            <Row>
              <Col className='pb-4'>
                <a href={Movie.MovieWatch} target='blank'>
                  <Button
                    className='watch-button'
                    variant='btn btn-success mt-'
                  >
                    Watch Now
                  </Button>
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className='movie-description-heading mt-1 font-style-bold pb-2'>
                  You may also like
                </h2>{' '}
              </Col>
            </Row>
            <div className='row-posters'>
              {similarMovies.map((movie) => (
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  id='link-style'
                  to={`/movies/${movie._id}`}
                >
                  <img className='movie-poster' src={movie.ImagePath} alt='' />
                </Link>
              ))}
            </div>
          </Container>
        </Container>
      </Container>
    </>
  );
};
