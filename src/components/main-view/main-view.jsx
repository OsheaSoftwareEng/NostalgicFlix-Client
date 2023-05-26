import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
  const [movies] = useState([
    {
      id: 1,
      title: 'The Girl Next Door',
      description:
        'Eighteen-year-old Matthew Kidman (Emile Hirsch) is a straight-arrow overachiever who has never really lived life... until he falls for his new neighbor, the beautiful and seemingly innocent blonde Danielle (Elisha Cuthbert). When Matthew discovers this perfect girl next door is a one-time porn star, his sheltered existence begins to spin out of control. Ultimately, Danielle helps Matthew break out from his shell and discover that sometimes you have to risk everything for the person you love.',
      genre: {
        name: 'Comedy',
        description:
          'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      director: {
        name: 'Luke Greenfield',
        bio: 'Luke was born in Manhassett, New York and grew up in Westport, Connecticut.He\'s best known for creating films that are unpredictable and surprising to audiences such as his film, "The Girl Next Door."'
      },
      image:
        'https://m.media-amazon.com/images/M/MV5BMTQ0ODIyMzE1N15BMl5BanBnXkFtZTcwODEwODczMw@@._V1_FMjpg_UY2048_.jpg'
    },
    {
      id: 2,
      title: 'Superbad',
      description:
        'Two inseparable best friends navigate the last weeks of high school and are invited to a gigantic house party. Together with their nerdy friend, they spend a long day trying to score enough alcohol to supply the party and inebriate two girls in order to kick-start their sex lives before they go off to college. Their quest is complicated after one of them falls in with two inept cops who are determined to show him a good time.',
      genre: {
        name: 'Comedy',
        description:
          'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      director: {
        name: 'Greg Mottola',
        bio: 'Gregory J. Mottola is an American film director, screenwriter, and television director.'
      },
      image:
        'https://m.media-amazon.com/images/M/MV5BY2VkMDg4ZTYtN2M3Yy00NWZiLWE2ODEtZjU5MjZkYWNkNGIzXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_FMjpg_UY2940_.jpg'
    },
    {
      id: 3,
      title: 'Kung Fu Hustle',
      description:
        "When the hapless Sing and his dim-witted pal Bone try to scam the residents of Pig Sty Alley into thinking they're members of the dreaded Axe Gang, the real gangsters descend on this Shanghai slum to restore their fearsome reputation. What gang leader Brother Sum doesn't know is that three legendary retired kung fu masters live anonymously in this decrepit neighborhood and don't take kindly to interlopers.",
      genre: {
        name: 'Comedy',
        description:
          'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      director: {
        name: 'Stephen Chow',
        bio: 'Stephen Chow Sing-chi is a Hong Kong filmmaker, former actor and comedian, known for Shaolin Soccer and Kung Fu Hustle.'
      },
      image:
        'https://m.media-amazon.com/images/M/MV5BMjZiOTNlMzYtZWYwZS00YWJjLTk5NDgtODkwNjRhMDI0MjhjXkEyXkFqcGdeQXVyMjgyNjk3MzE@._V1_FMjpg_UX800_.jpg'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
