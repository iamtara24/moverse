import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent, Grid, CircularProgress } from '@mui/material';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Genre: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
  Awards: string;
}

const MovieDetail: React.FC = () => {
  const location = useLocation();
  const movie = location.state as Movie;
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = 'AIzaSyDYwUe2LTt6hJK6vZN7f_dY3SlXZWCLnsU';

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: `${movie.Title} trailer`,
            key: apiKey,
            maxResults: 1
          }
        });
        const trailerUrl = `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`;
        setTrailer(trailerUrl);
      } catch (error) {
        console.error('Failed to fetch trailer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [movie.Title, apiKey]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>{movie.Title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={movie.Poster}
              alt={movie.Title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6">Rating: {movie.imdbRating}</Typography>
            <Typography variant="body1">{movie.Genre}</Typography>
            <Typography variant="body2">{movie.Plot}</Typography>
            <Typography variant="body1"><strong>Director:</strong> {movie.Director}</Typography>
            <Typography variant="body1"><strong>Writer:</strong> {movie.Writer}</Typography>
            <Typography variant="body1"><strong>Actors:</strong> {movie.Actors}</Typography>
            <Typography variant="body1"><strong>Awards:</strong> {movie.Awards}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <CircularProgress />
          ) : (
            trailer && (
              <Box mt={2}>
                <Typography variant="h6">Trailer</Typography>
                <iframe width="100%" height="315" src={trailer} title="Movie Trailer" frameBorder="0" allowFullScreen></iframe>
              </Box>
            )
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetail;