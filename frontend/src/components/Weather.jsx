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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens
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
          padding: isSmallScreen ? 2 : 4, // Reduce padding on small screens
          minHeight: '100vh',
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(
            theme.palette.background.default,
            0.9
          )})`,
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h4' : 'h3'} // Adjust font size for small screens
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 4,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Weather Search
        </Typography>

        <Paper
          elevation={isSmallScreen ? 1 : 3} // Reduce elevation on small screens
          sx={{
            p: 2,
            mb: 4,
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row', // Stack vertically on small screens
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha(theme.palette.background.paper, isSmallScreen ? 0.7 : 0.8), // Reduce opacity on small screens
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
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
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
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
            elevation={isSmallScreen ? 1 : 4} // Reduce elevation on small screens
            sx={{
              mb: 4,
              background: alpha(theme.palette.background.paper, isSmallScreen ? 0.7 : 0.9), // Reduce opacity on small screens
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ fontWeight: 600 }}> {/* Adjust font size */}
                  {weather.city}
                </Typography>
                <IconButton
                  onClick={addToFavorites}
                  sx={{
                    color: isCityInFavorites() ? theme.palette.error.main : theme.palette.primary.main,
                  }}
                >
                  {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500 }}> {/* Adjust font size */}
                    {weather.temperature}°C
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Temperature
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500 }}> {/* Adjust font size */}
                    {weather.conditions}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Conditions
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ fontWeight: 500 }}> {/* Adjust font size */}
                    {weather.humidity}%
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
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
              variant={isSmallScreen ? 'h5' : 'h4'} // Adjust font size
              gutterBottom
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              7-Day Forecast
            </Typography>
            <Grid container spacing={2}>
              {forecast.map((day, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={isSmallScreen ? 1 : 3} // Reduce elevation on small screens
                    sx={{
                      height: '100%',
                      background: alpha(theme.palette.background.paper, isSmallScreen ? 0.7 : 0.9), // Reduce opacity on small screens
                      backdropFilter: 'blur(8px)',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600, mb: 2 }}> {/* Adjust font size */}
                        {day.date}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1">
                          Temperature: <strong>{day.temperature}°C</strong>
                        </Typography>
                        <Typography variant="body1">
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
            <Map center={mapCenter} />
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
};

export default Weather;