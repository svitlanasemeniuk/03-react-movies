import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get('/search/movie', {
        params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY, 
            query,
            include_adult: false,
            language: 'en-US',
            page: 1
    }
    });

    return response.data.results;
};
