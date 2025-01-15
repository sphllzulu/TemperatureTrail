


import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  Snackbar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import SuggestedActivities from './SuggestedActivities';
import Map from './Map';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });


  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://temperaturetrail.onrender.com/api/weather?city=${city}`,
        { withCredentials: true }
      );
      setWeather(response.data.currentWeather);
      setForecast(response.data.forecast);
      setMapCenter({
        lat: response.data.currentWeather.lat,
        lng: response.data.currentWeather.lon,
      });
      const activitiesResponse = await axios.get(
        `https://temperaturetrail.onrender.com/api/activities?city=${city}&weatherCondition=${response.data.currentWeather.conditions}`,
        { withCredentials: true }
      );
      setActivities(activitiesResponse.data.activities);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setSnackbarMessage('Error fetching weather data');
      setSnackbarOpen(true);
    }
  };


  const addToFavorites = async () => {
    try {
      const response = await axios.post(
        'https://temperaturetrail.onrender.com/api/favorites',
        { destination: city },
        { withCredentials: true }
      );
      setFavorites(response.data.favorites);
      setSnackbarMessage('Added to favorites!');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error.response?.status === 401
          ? 'Please login to add favorites'
          : 'Error adding to favorites'
      );
      setSnackbarOpen(true);
    }
  };


  const isCityInFavorites = () => {
    return favorites.some((fav) => fav.destination.toLowerCase() === city.toLowerCase());
  };


  return (
    <Box sx={{ padding: 3 }}>

<Typography variant="h4" gutterBottom>
         Weather Search
       </Typography>
     
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', }}>
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fetchWeather();
            }
          }}
          sx={{ width: 500 }}
        />
        <IconButton color="primary" onClick={fetchWeather}>
          <SearchIcon />
        </IconButton>
      </Box>


      {weather && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4">{weather.city}</Typography>
              <IconButton onClick={addToFavorites} color="primary">
                {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Typography>Temperature: {weather.temperature}°C</Typography>
            <Typography>Conditions: {weather.conditions}</Typography>
            <Typography>Humidity: {weather.humidity}%</Typography>
            <img src={weather.icon} alt="Weather icon" />
          </CardContent>
        </Card>
      )}


      {forecast.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            7-Day Forecast
          </Typography>
          <Grid container spacing={2}>
            {forecast.map((day, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{day.date}</Typography>
                    <Typography>Temperature: {day.temperature}°C</Typography>
                    <Typography>Conditions: {day.conditions}</Typography>
                    <img src={day.icon} alt="Weather icon" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}


      <SuggestedActivities activities={activities} />


      {mapCenter.lat !== 0 && mapCenter.lng !== 0 && <Map center={mapCenter} />}


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};


export default Weather;
