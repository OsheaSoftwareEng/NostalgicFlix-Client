import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  //creates state changes for selected movies
  const [selectedMovie, setSelectedMovie] = useState(null);

  //
  useEffect(() => {
    fetch('https://nostalgic-flix.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured.toString()
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  //statement for movies selected to show movie view details and includes code for when clicking the back button to go to list of movies.
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  //if theres no movies in the array the page will say the list is empty
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  //return statement for movies in the array being displayed and being clickable from MovieCard file
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.Title}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
