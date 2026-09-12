import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/moviesService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';   
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      // 1. Скидаємо старі дані перед новим пошуком
      setMovies([]);
      setIsError(false);
      setIsLoading(true);

      // 2. Робимо запит
      const data = await fetchMovies(query);

      // 3. Перевіряємо, чи є результати
      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false); // Вимикаємо лоадер за будь-якого результату
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      <MovieGrid 
        movies={movies} 
        onSelect={setSelectedMovie} />
      

      <Toaster position="top-right" />

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default App;