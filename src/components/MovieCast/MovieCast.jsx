import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '@services/fetchImages';
import { getImageUrl } from '@helpers/helpers';

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieCast() {
      const { cast } = await fetchMovieCast(movieId);
      setCast(cast);
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {cast && (
        <ul>
          {cast.map(({ id, name, profile_path }) => {
            return (
              <li key={id}>
                <img src={getImageUrl(profile_path)} alt={name} />
                <h3>{name}</h3>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
