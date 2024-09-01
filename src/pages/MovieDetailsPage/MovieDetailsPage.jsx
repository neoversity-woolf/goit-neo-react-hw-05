import { Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '@services/fetchImages';
import { getImageUrl, activeLinkClass } from '@helpers/helpers';

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
      <Link className={css.backward} to={backLinkHref}>
        Go back
      </Link>
      <h1 className="visually-hidden">Movie Details Page</h1>
      {details && (
        <article className={css.detailsInfo}>
          <div className={css.wrapper}>
            <img
              className={css.poster}
              src={getImageUrl(details.backdrop_path)}
              alt={details.original_title}
            />
          </div>
          <div className={css.meta}>
            <h2>{details.original_title}</h2>
            <p>
              <span>User score</span>:<span>{details.vote_average}</span>
            </p>
            {details.genres.length !== 0 && (
              <div className={css.genres}>
                <h3>Genres:</h3>
                <div>
                  {details.genres.map(({ id, name }) => {
                    return <p key={id}>{name}</p>;
                  })}
                </div>
              </div>
            )}
          </div>
          <div className={css.overview}>
            <h3>Overview</h3>
            <p>{details.overview}</p>
          </div>
        </article>
      )}
      <nav className={css.detailsNav}>
        <NavLink
          className={navLinkDetails => activeLinkClass(navLinkDetails, css)}
          to="cast"
        >
          Cast
        </NavLink>
        <NavLink
          className={navLinkDetails => activeLinkClass(navLinkDetails, css)}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </main>
  );
}
