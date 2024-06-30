import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/img/clientlogo.png';
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
      <Container maxWidth="sm" sx={{ height: '100%', display: 'flex' }}>
        <Stack spacing={2} direction="column" alignItems="center" justifyContent="space-between">
          <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: '10%',
                marginTop: '6rem!important',
                margin: '0 auto'
              }}
            />
            <Stack spacing={2} alignItems="center">
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: 'lato, sans-serif', fontSize: '2.0625rem', fontWeight: 'bold' }}>
                  MoVerse
                </Typography>
                <Typography sx={{ fontFamily: 'lato, sans-serif', fontSize: '2.0625rem', fontWeight: 'bold' }}>
                  Jelajahi Dunia Film Tanpa Batas
                </Typography>
                <Typography sx={{ fontFamily: 'lato, sans-serif', fontSize: '.77rem', mt: 1 }}>
                  Cari dan Temukan film favoritmu dari seluruh dunia. Mulai dari film indie yang menyentuh hingga blockbuster yang mendebarkan. Temukan semua informasi yang kamu butuhkan hanya di MoVerse.
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
            <Typography variant="body2" color="textSecondary" align="center" pb={5}>
              © Copyright All Rights Reserved 2024. Developed by Anggin Megantara
            </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Homepage;