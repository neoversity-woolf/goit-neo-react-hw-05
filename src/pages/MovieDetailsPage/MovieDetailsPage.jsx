import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '@services/fetchImages';
import { getImageUrl } from '@helpers/helpers';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const details = await fetchMovieDetails(movieId);
        setDetails(details);
      } catch (error) {
        console.log(error.message);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <main className={css.details}>
      <Link to={backLinkHref}>Go back</Link>
      <h1>Movie Details Page</h1>
      {details && (
        <article>
          <img src={getImageUrl(details.backdrop_path)} alt="" />
          <h3>Film name {details.original_title}</h3>
          <p>User score: {details.vote_average}</p>
          <h3>Overview</h3>
          <p>{details.overview}</p>
          <h3>Genres:</h3>
          <div>
            {details.genres.map(({ id, name }) => {
              return <p key={id}>{name}</p>;
            })}
          </div>
        </article>
      )}
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>

      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </main>
  );
}
