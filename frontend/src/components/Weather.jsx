// import { useState } from 'react';
// import axios from 'axios';
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Box,
//   IconButton,
//   Snackbar,
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import SuggestedActivities from './SuggestedActivities';
// import Map from './Map';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

//   // Fetch weather and forecast data
//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/weather?city=${city}`,
//         { withCredentials: true }
//       );

//       // Set current weather and forecast data
//       setWeather(response.data.currentWeather);
//       setForecast(response.data.forecast);
//       setMapCenter({
//         lat: response.data.currentWeather.lat,
//         lng: response.data.currentWeather.lon,
//       });

//       // Fetch activities based on weather conditions
//       const activitiesResponse = await axios.get(
//         `http://localhost:3000/api/activities?city=${city}&weatherCondition=${response.data.currentWeather.conditions}`,
//         { withCredentials: true }
//       );
//       setActivities(activitiesResponse.data.activities);
//     } catch (error) {
//       console.error('Error fetching weather:', error);
//       setSnackbarMessage('Error fetching weather data');
//       setSnackbarOpen(true);
//     }
//   };

//   // Add a city to favorites
//   const addToFavorites = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/favorites',
//         { destination: city },
//         { withCredentials: true }
//       );
//       setFavorites(response.data.favorites);
//       setSnackbarMessage('Added to favorites!');
//       setSnackbarOpen(true);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         setSnackbarMessage('Please login to add favorites');
//       } else {
//         setSnackbarMessage('Error adding to favorites');
//       }
//       setSnackbarOpen(true);
//     }
//   };

//   // Check if a city is in favorites
//   const isCityInFavorites = () => {
//     return favorites.some((fav) => fav.destination.toLowerCase() === city.toLowerCase());
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h3" gutterBottom>
//         Weather Search
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
//         <TextField
//           label="Enter city"
//           variant="outlined"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               fetchWeather();
//             }
//           }}
//         />
//         <Button variant="contained" onClick={fetchWeather}>
//           Search
//         </Button>
//       </Box>

//       {/* Current Weather */}
//       {weather && (
//         <Card sx={{ marginBottom: 3 }}>
//           <CardContent>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography variant="h4">{weather.city}</Typography>
//               <IconButton onClick={addToFavorites} color="primary">
//                 {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//               </IconButton>
//             </Box>
//             <Typography>Temperature: {weather.temperature}°C</Typography>
//             <Typography>Conditions: {weather.conditions}</Typography>
//             <Typography>Humidity: {weather.humidity}%</Typography>
//             <img src={weather.icon} alt="Weather icon" />
//           </CardContent>
//         </Card>
//       )}

//       {/* 7-Day Forecast */}
//       {forecast.length > 0 && (
//         <Box sx={{ marginBottom: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             7-Day Forecast
//           </Typography>
//           <Grid container spacing={2}>
//             {forecast.map((day, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">{day.date}</Typography>
//                     <Typography>Temperature: {day.temperature}°C</Typography>
//                     <Typography>Conditions: {day.conditions}</Typography>
//                     <img src={day.icon} alt="Weather icon" />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {/* Render the SuggestedActivities component */}
//       <SuggestedActivities activities={activities} />

//       {/* Map */}
//       {mapCenter.lat !== 0 && mapCenter.lng !== 0 && <Map center={mapCenter} />}

      

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };

// export default Weather;


// import { useState } from 'react';
// import axios from 'axios';
// import {
//   TextField,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Box,
//   IconButton,
//   Snackbar,
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import SearchIcon from '@mui/icons-material/Search';
// import SuggestedActivities from './SuggestedActivities';
// import Map from './Map';


// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });


//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(
//         `https://temperaturetrail.onrender.com/api/weather?city=${city}`,
//         { withCredentials: true }
//       );
//       setWeather(response.data.currentWeather);
//       setForecast(response.data.forecast);
//       setMapCenter({
//         lat: response.data.currentWeather.lat,
//         lng: response.data.currentWeather.lon,
//       });
//       const activitiesResponse = await axios.get(
//         `https://temperaturetrail.onrender.com/api/activities?city=${city}&weatherCondition=${response.data.currentWeather.conditions}`,
//         { withCredentials: true }
//       );
//       setActivities(activitiesResponse.data.activities);
//     } catch (error) {
//       console.error('Error fetching weather:', error);
//       setSnackbarMessage('Error fetching weather data');
//       setSnackbarOpen(true);
//     }
//   };


//   const addToFavorites = async () => {
//     try {
//       const response = await axios.post(
//         'https://temperaturetrail.onrender.com/api/favorites',
//         { destination: city },
//         { withCredentials: true }
//       );
//       setFavorites(response.data.favorites);
//       setSnackbarMessage('Added to favorites!');
//       setSnackbarOpen(true);
//     } catch (error) {
//       setSnackbarMessage(
//         error.response?.status === 401
//           ? 'Please login to add favorites'
//           : 'Error adding to favorites'
//       );
//       setSnackbarOpen(true);
//     }
//   };


//   const isCityInFavorites = () => {
//     return favorites.some((fav) => fav.destination.toLowerCase() === city.toLowerCase());
//   };


//   return (
//     <Box sx={{ padding: 3 }}>

// <Typography variant="h4" gutterBottom>
//          Weather Search
//        </Typography>
     
//       <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', }}>
//         <TextField
//           label="Enter city"
//           variant="outlined"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               fetchWeather();
//             }
//           }}
//           sx={{ width: 500 }}
//         />
//         <IconButton color="primary" onClick={fetchWeather}>
//           <SearchIcon />
//         </IconButton>
//       </Box>


//       {weather && (
//         <Card sx={{ marginBottom: 3 }}>
//           <CardContent>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography variant="h4">{weather.city}</Typography>
//               <IconButton onClick={addToFavorites} color="primary">
//                 {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//               </IconButton>
//             </Box>
//             <Typography>Temperature: {weather.temperature}°C</Typography>
//             <Typography>Conditions: {weather.conditions}</Typography>
//             <Typography>Humidity: {weather.humidity}%</Typography>
//             <img src={weather.icon} alt="Weather icon" />
//           </CardContent>
//         </Card>
//       )}


//       {forecast.length > 0 && (
//         <Box sx={{ marginBottom: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             7-Day Forecast
//           </Typography>
//           <Grid container spacing={2}>
//             {forecast.map((day, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">{day.date}</Typography>
//                     <Typography>Temperature: {day.temperature}°C</Typography>
//                     <Typography>Conditions: {day.conditions}</Typography>
//                     <img src={day.icon} alt="Weather icon" />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}


//       <SuggestedActivities activities={activities} />


//       {mapCenter.lat !== 0 && mapCenter.lng !== 0 && <Map center={mapCenter} />}


//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };


// export default Weather;

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
  Paper,
  Container,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import SuggestedActivities from './SuggestedActivities';
import Map from './Map';

const Weather = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: isSmallScreen ? 2 : 4,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e1e2f, #2a2a40)', // Futuristic gradient background
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h4' : 'h3'}
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            mb: 4,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        >
          Weather Search
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha('#ffffff', 0.1), // Transparent white background
            backdropFilter: 'blur(10px)', // Blur effect
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
          }}
        >
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
            sx={{
              width: '100%',
              maxWidth: 500,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={fetchWeather}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {weather && (
          <Card
            elevation={0}
            sx={{
              mb: 4,
              background: alpha('#ffffff', 0.1), // Transparent white background
              backdropFilter: 'blur(10px)', // Blur effect
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ fontWeight: 600, color: '#ffffff' }}>
                  {weather.city}
                </Typography>
                <IconButton onClick={addToFavorites} sx={{ color: isCityInFavorites() ? theme.palette.error.main : '#ffffff' }}>
                  {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500, color: '#ffffff' }}>
                    {weather.temperature}°C
                  </Typography>
                  <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.7)">
                    Temperature
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500, color: '#ffffff' }}>
                    {weather.conditions}
                  </Typography>
                  <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.7)">
                    Conditions
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500, color: '#ffffff' }}>
                    {weather.humidity}%
                  </Typography>
                  <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.7)">
                    Humidity
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img src={weather.icon} alt="Weather icon" style={{ width: '64px', height: '64px' }} />
              </Box>
            </CardContent>
          </Card>
        )}

        {forecast.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant={isSmallScreen ? 'h5' : 'h4'}
              gutterBottom
              sx={{
                fontWeight: 600,
                color: '#ffffff',
                mb: 3,
              }}
            >
              7-Day Forecast
            </Typography>
            <Grid container spacing={2}>
              {forecast.map((day, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      background: alpha('#ffffff', 0.1), // Transparent white background
                      backdropFilter: 'blur(10px)', // Blur effect
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600, mb: 2, color: '#ffffff' }}>
                        {day.date}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1" color="#ffffff">
                          Temperature: <strong>{day.temperature}°C</strong>
                        </Typography>
                        <Typography variant="body1" color="#ffffff">
                          Conditions: <strong>{day.conditions}</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                          <img src={day.icon} alt="Weather icon" style={{ width: '48px', height: '48px' }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <SuggestedActivities activities={activities} />

        {mapCenter.lat !== 0 && mapCenter.lng !== 0 && (
          <Box sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
            <Map center={mapCenter} activities={activities} />
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          sx={{
            '& .MuiSnackbarContent-root': {
              background: alpha('#1e1e2f', 0.9), // Dark background for snackbar
              backdropFilter: 'blur(10px)', // Blur effect
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Weather;