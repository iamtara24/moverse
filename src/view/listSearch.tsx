import React from 'react';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Stack } from '@mui/material';
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

const ListSearch: React.FC = () => {
  const location = useLocation();
  const movies = location.state as Movie[];
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };
  return (
    <Box p={2}>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
            <IconButton aria-label="backward" onClick={() => handleNavigation('/')}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Search Results</Typography>
        </Stack>
        <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="435"
                image={movie.Poster}
                alt={movie.Title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{movie.Title}</Typography>
                    <Typography variant="body2" color="textSecondary">{movie.Year}</Typography>
                </Stack>
                <Typography variant="body2" color="textSecondary">{movie.Genre}</Typography>
                <Stack direction="row" spacing={2} alignItems="end" mt={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon sx={{ color: '#888' }}/>
                        <Typography variant="body2" color="textSecondary">{movie.Runtime}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <StarsIcon sx={{ color: '#FFC100' }} />
                        <Typography variant="body2" color="textSecondary">{movie.imdbRating}</Typography>
                    </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListSearch;