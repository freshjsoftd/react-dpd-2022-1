import React, {useEffect, useState} from 'react';

import movieService from './movie-service';
import './App.css';
import WatchForm from './components/WatchForm/WatchForm';
import WatchList from './components/WatchList/WatchList';
import initialState from './model/initial-to-watch';
import {MovieContext} from './context';

function App() {
  const [toWatchMovies, setToWatchMovies] = useState(initialState);

    useEffect(() => {
    movieService.get('/').then(({data}) => {
      if (!data) {
        setToWatchMovies([]);
      } else {
        setToWatchMovies(data);
      }
    });
  }, []);

  function deleteToWatch(id) {
    movieService
      .delete(`/${id}`)
      .then(({statusText}) => console.log(statusText));
    const newWatchMovies = toWatchMovies.filter((movie) => movie.id !== id);
    setToWatchMovies(newWatchMovies);
  }


  function toggleToWatch(id) {
    const updatedMovie = toWatchMovies.find((movie) => movie.id === id);
    updatedMovie.isDone = !updatedMovie.isDone;
    movieService.put(`/${id}`, updatedMovie).then(({data}) => {
      setToWatchMovies(
        toWatchMovies.map((movie) => (movie.id !== id ? movie : data)),
      );
    });
  }

  function addNewToWatch(toWatch) {
    toWatch.id = Date.now();
    movieService.post('/', toWatch).then(({data}) => {
      const newWatchMovies = [...toWatchMovies, data];
      setToWatchMovies(newWatchMovies);
    });
  }

  return (
    <div className="container">
      <MovieContext.Provider value={toWatchMovies}>
        <WatchList
          onToggle={toggleToWatch}
          onDelete={deleteToWatch}
        />
        <WatchForm onSubmit={addNewToWatch} />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
