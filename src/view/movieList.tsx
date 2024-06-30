import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { To, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Pagination, Typography, Stack, IconButton, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Genre?: string;
  imdbRating?: string;
  Runtime?: string;
}

const apiKey = '314ec7dc';
const itemsPerPage = 8;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.imdbID}`, { state: movie });
  };

  const fetchMovies = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=movie&apikey=${apiKey}&page=${page}`);
      if (response.data.Response === 'True') {
        const movieDetails = await Promise.all(response.data.Search.map(async (movie: Movie) => {
          const details = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          return { ...movie, ...details.data };
        }));
        setMovies(movieDetails);
        setTotalResults(parseInt(response.data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box p={2}>
      <Stack direction="row" spacing={2} mb={2} alignItems="center">
        <IconButton aria-label="backward" onClick={() => handleNavigation('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Semua Daftar Film
        </Typography>
      </Stack>
      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(itemsPerPage)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Skeleton variant="rectangular" height={435} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="80%" />
                    <Stack direction="row" spacing={2} alignItems="end" mt={2}>
                      <Skeleton variant="text" width="30%" />
                      <Skeleton variant="text" width="20%" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={() => handleMovieClick(movie)}>
                  <CardMedia
                    component="img"
                    height="435"
                    image={movie?.Poster}
                    alt={movie?.Title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{movie?.Title}</Typography>
                      <Typography variant="body2" color="textSecondary">{movie?.Year}</Typography>
                    </Stack>
                    <Typography variant="body2" color="textSecondary">{movie?.Genre}</Typography>
                    <Stack direction="row" spacing={2} alignItems="end" mt={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon sx={{ color: '#888' }} />
                        <Typography variant="body2" color="textSecondary">{movie?.Runtime}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <StarsIcon sx={{ color: '#FFC100' }} />
                        <Typography variant="body2" color="textSecondary">{movie?.imdbRating}</Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Pagination
          count={Math.ceil(totalResults / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default MovieList;
