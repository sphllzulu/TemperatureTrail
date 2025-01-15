import React, { useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Weather from '../components/Weather';

// Styled components
const StyledHeroSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  marginBottom: theme.spacing(4),
  borderRadius: 0
}));

const StyledWeatherContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3]
}));

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledHeroSection elevation={0}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Weather-Based Travel Planner
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="inherit"
            paragraph
            sx={{ opacity: 0.9, padding: }}
          >
            Plan your adventures with real-time weather insights
          </Typography>
        </Container>
      </StyledHeroSection>

      <Container maxWidth="md">
        <StyledWeatherContainer>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Weather 
              weatherData={weatherData} 
              onSearch={handleSearch}
            />
          )}
        </StyledWeatherContainer>
      </Container>
    </Box>
  );
};

export default Home;