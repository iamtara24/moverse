import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/img/clientLogo.png';
import background from '../assets/img/background.jpg';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Genre?: string;
  imdbRating?: string;
  Runtime?: string;
}

const Homepage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const apiKey = '314ec7dc';

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
      if (response.data.Response === 'True') {
        const movies = await Promise.all(response.data.Search.map(async (movie: Movie) => {
          const details = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          return { ...movie, ...details.data };
        }));
        setError(null);
        navigate('/results', { state: movies });
      } else {
        setError('Film yang anda cari tidak tersedia');
      }
    } catch (err) {
      setError('Koneksi Terputus, Gagal Mengambil Data');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={2} alignItems="center">
          <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: '15%',
                marginBottom: '2rem',
                margin: '0 auto'
              }}
            />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontFamily: 'lato, sans-serif', fontSize: '2.0625rem', fontWeight: 'bold' }}>
              Anti Kudet!
            </Typography>
            <Typography sx={{ fontFamily: 'lato, sans-serif', fontSize: '1.2rem', mt: 1, fontWeight: 'bold' }}>
              Semua Informasi Tentang Film Paling Update Hanya Disini!
            </Typography>
          </Box>
          <Stack direction='row' sx={{ mt: 3, width: '100%' }}>
            <TextField
              variant="outlined"
              placeholder="Cari film favoritmu disini..."
              fullWidth
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="error"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="body2" color="secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            <Link to="/all-movies" style={{ textDecoration: 'none', color: 'red' }}>
              Atau lihat semua daftar film disini
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Homepage;