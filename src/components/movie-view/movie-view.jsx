import './movie-view.scss';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { BsBookmarkPlusFill, BsBookmarkPlus } from 'react-icons/bs';

//information for movie information displayed once user clicks a movie
export const MovieView = ({ movieInfo, movie, token, user, updatedUser }) => {
  //monitors the DOM and when a movie is clicked it will always scroll to the top if it's not already there.

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //gets movie id from database and uses it as the parameters in the url
  const { movieId } = useParams();

  //searches through the list of database if movies and grabs the id to be displayed in the url
  const Movie = movieInfo.find((movie) => movie._id === movieId);

  //searches through the database of movies and filters out movies with the same genre and displays them but not the same movie
  const similarMovies = (genreName) =>
    movie.filter((m) => m.Genre.Name == genreName && m._id !== movieId);

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
  const [Favorite, setFavorite] = useState(
    user.FavoriteMovies.includes(Movie._id)
  );

  //add favorite movies function for users to add movies to favorites
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
          //custom alert when user successfully adds movie to favorites
          Toast.fire({
            icon: 'success',
            title: `${Movie.Title} has been added to your Watchlist'`
          });
          return response.json();
        } else {
          //custom alert when response fails to add movie to favorites
          Toast.fire({
            icon: 'error',
            title: `${Movie.Title} could not be added to your Watchlist'`
          });
          return false;
        }
      })
      //if movie added is successful it saves the movie to favorite state and updates the users favorites list
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

  //remove favorite movies function for users to remove movies to favorites
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
          //custom alert when user removes adds movie to favorites
          Toast.fire({
            icon: 'success',
            title: `${Movie.Title} has been removed from your Watchlist'`
          });
          return response.json();
        } else {
          //custom alert when response fails to remove movie to favorites
          Toast.fire({
            icon: 'error',
            title: 'something went wrong'
          });
          return false;
        }
      })
      //if movie removed is successful it removes the movie from  the favorite movie state and updates the users favorites list
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
      <Container id='container' className='p-0 m-0'>
        <Container fluid id='movie-view-section-top'>
          <div id='movie-content'>
            <Row>
              <Col className='col-md-9 p-0 d-flex margin-style'>
                <h1 className='title-style font-style-bold'>{Movie.Title}</h1>
                {Favorite ? (
                  <BsBookmarkPlusFill
                    className='full-bookmark move-bookmark-mv'
                    color='#ff6b81'
                    size
                    onClick={removeFavorite}
                  />
                ) : (
                  <BsBookmarkPlus
                    className='outline-bookmark move-bookmark-mv'
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
              <Col id='col-remove'>
                <div className='col-xs-5'>
                  <img id='movie-image' src={Movie.ImagePath} alt='' />
                </div>
              </Col>
              <Col>
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
          </div>
        </Container>
        <Container id='movie-view-section-bottom' className='p-0'>
          <Container
            className='h-100'
            id='movie-description-section-bottom p-0'
          >
            <Row>
              <Col>
                <h2 className='movie-description-heading mt-1 font-style-bold p-1'>
                  Storyline
                </h2>
              </Col>
            </Row>
            <Row>
              <Col className='mb-2 pb-3'>
                <span className='movie-description font-style p-0'>
                  {Movie.Description}
                </span>
              </Col>
            </Row>
            <div className='border-top'></div>
            <Col className='pt-2 pb-2'>
              <span className='movie-styles-name font-style-bold p-1'>
                Director{' '}
              </span>
              <span className='movie-styles-name font-style-i'>
                {Movie.Director.Name}
              </span>
            </Col>
            <div className='border-top'></div>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-styles-name font-style-bold p-1'>
                  Writers{' '}
                </span>
                <span className='movie-styles-name font-style-i'>
                  {Movie.Writers[0]} ⋆ {Movie.Writers[1]} ⋆ {Movie.Writers[2]}
                  {Movie.Writers[3]}
                </span>
              </Col>
              <div className='border-top'></div>
            </Row>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-styles-name font-style-bold p-1'>
                  Stars{' '}
                </span>
                <span className='movie-styles-name font-style-i'>
                  {Movie.Actors[0]} · {Movie.Actors[1]} · {Movie.Actors[2]}
                  {Movie.Actors[3]}
                </span>
              </Col>
              <div className='border-top'></div>
            </Row>
            <Row>
              <Col className='pt-2 pb-2'>
                <span className='movie-styles-name font-style-bold p-1'>
                  Genres{' '}
                </span>
                <span className='movie-styles-name font-style-i'>
                  {Movie.Genres[0]} · {Movie.Genres[1]} · {Movie.Genres[2]}
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
              {similarMovies(Movie.Genre.Name).map((movie) => (
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  id='link-style'
                  to={`/movies/${movie._id}`}
                >
                  <img
                    className='movie-carousel'
                    src={movie.ImagePath}
                    alt=''
                  />
                </Link>
              ))}
            </div>
          </Container>
        </Container>
      </Container>
    </>
  );
};
