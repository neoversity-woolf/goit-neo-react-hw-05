import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '@services/fetchImages';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieReviews() {
      const { results } = await fetchMovieReviews(movieId);
      setReviews(results);
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <article key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </article>
          ))}
        </ul>
      ) : (
        <p>❌ No reviews found</p>
      )}
    </>
  );
}
