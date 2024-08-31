import { PiFilmReelDuotone } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

/* eslint-disable react/prop-types */
export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul>
      {movies.map(({ title, id }) => (
        <li key={id}>
          <Link className={css.link} to={`/movies/${id}`} state={location}>
            <PiFilmReelDuotone size={32} />
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
