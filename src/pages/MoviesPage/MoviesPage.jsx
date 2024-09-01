import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieList } from '@components';
import { fetchMoviesByQuery } from '@services/fetchImages';

import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query.trim() === '') return;

    async function getMoviesByQuery() {
      try {
        const { results } = await fetchMoviesByQuery(query);
        if (results.length === 0) {
          throw new Error('❌ Service unavailable');
        }

        setSearchMovie(results);
      } catch (error) {
        console.log(error.message);
      }
    }
    getMoviesByQuery();
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <main className={css.main}>
      <h1>
        Discover Your Next Favorite Movie
        <span className="textGradient">Search &rarr; Watch &rarr; Enjoy</span>
      </h1>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchField}
          type="search"
          name="query"
          placeholder="Find movie..."
        />
        <button type="submit">Search</button>
      </form>
      {searchMovie.length !== 0 && <MovieList movies={searchMovie} />}
    </main>
  );
}
