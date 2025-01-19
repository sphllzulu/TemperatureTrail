// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Box, 
//   Divider,
//   IconButton,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Trash2 } from 'lucide-react';

// const Profile = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const [favoritesRes, historyRes] = await Promise.all([
//         axios.get('https://temperaturetrail.onrender.com/api/favorites', { withCredentials: true }),
//         axios.get('https://temperaturetrail.onrender.com/api/search-history', { withCredentials: true })
//       ]);
      
//       setFavorites(favoritesRes.data.favorites);
//       setSearchHistory(historyRes.data.searchHistory);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       showSnackbar('Error loading profile data', 'error');
//     }
//   };

//   const handleDeleteFavorite = async (destination) => {
//     try {
//       await axios.delete(`https://temperaturetrail.onrender.com/api/favorites/${encodeURIComponent(destination)}`, {
//         withCredentials: true
//       });
//       setFavorites(favorites.filter(fav => fav.destination !== destination));
//       showSnackbar('Favorite removed successfully');
//     } catch (error) {
//       console.error('Error deleting favorite:', error);
//       showSnackbar('Error removing favorite', 'error');
//     }
//   };

//   const handleDeleteSearch = async (searchId) => {
//     try {
//       await axios.delete(`https://temperaturetrail.onrender.com/api/search-history/${searchId}`, {
//         withCredentials: true
//       });
//       setSearchHistory(searchHistory.filter(search => search._id !== searchId));
//       showSnackbar('Search history entry removed successfully');
//     } catch (error) {
//       console.error('Error deleting search history:', error);
//       showSnackbar('Error removing search history', 'error');
//     }
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({
//       open: true,
//       message,
//       severity
//     });
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar(prev => ({
//       ...prev,
//       open: false
//     }));
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h3" gutterBottom>
//         Profile
//       </Typography>

//       <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
//         Favorites
//       </Typography>
//       <Grid container spacing={2}>
//         {favorites.map((fav, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
//                   <div>
//                     <Typography variant="h6">{fav.destination}</Typography>
//                     <Typography color="textSecondary">Added by: {fav.name}</Typography>
//                   </div>
//                   <IconButton 
//                     onClick={() => handleDeleteFavorite(fav.destination)}
//                     size="small"
//                     color="error"
//                   >
//                     <Trash2 size={20} />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
//         Search History
//       </Typography>
//       <Grid container spacing={2}>
//         {searchHistory.map((search, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
//                   <div>
//                     <Typography variant="h6">{search.destination}</Typography>
//                     <Divider sx={{ my: 1 }} />
//                     <Typography>Temperature: {search.weather?.temperature}°C</Typography>
//                     <Typography>Humidity: {search.weather?.humidity}%</Typography>
//                     <Typography>Conditions: {search.weather?.conditions}</Typography>
//                     {search.weather?.icon && (
//                       <img 
//                         src={search.weather.icon} 
//                         alt="Weather icon"
//                         style={{ width: 50, height: 50 }}
//                       />
//                     )}
//                     <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                       Searched on: {new Date(search.timestamp).toLocaleString()}
//                     </Typography>
//                   </div>
//                   <IconButton 
//                     onClick={() => handleDeleteSearch(search._id)}
//                     size="small"
//                     color="error"
//                   >
//                     <Trash2 size={20} />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={6000} 
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleSnackbarClose} 
//           severity={snackbar.severity}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Profile;

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Container,
  useTheme,
  alpha,
  Paper,
  useMediaQuery
} from '@mui/material';
import { Trash2 } from 'lucide-react';

const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const [favoritesRes, historyRes] = await Promise.all([
        axios.get('https://temperaturetrail.onrender.com/api/favorites', { withCredentials: true }),
        axios.get('https://temperaturetrail.onrender.com/api/search-history', { withCredentials: true })
      ]);
      
      setFavorites(favoritesRes.data.favorites);
      setSearchHistory(historyRes.data.searchHistory);
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error);
      const errorMessage = error.response?.status === 401 
        ? 'Please log in to view your profile' 
        : error.response?.data?.error || 'Error loading profile data';
      showSnackbar(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFavorite = async (destination) => {
    try {
      await axios.delete(
        `https://temperaturetrail.onrender.com/api/favorites/${encodeURIComponent(destination)}`,
        { withCredentials: true }
      );
      setFavorites(favorites.filter(fav => fav.destination !== destination));
      showSnackbar('Favorite removed successfully');
    } catch (error) {
      console.error('Error deleting favorite:', error);
      showSnackbar(error.response?.data?.error || 'Error removing favorite', 'error');
    }
  };

  const handleDeleteSearch = async (searchId) => {
    try {
      await axios.delete(
        `https://temperaturetrail.onrender.com/api/search-history/${searchId}`,
        { withCredentials: true }
      );
      setSearchHistory(searchHistory.filter(search => search._id !== searchId));
      showSnackbar('Search history entry removed successfully');
    } catch (error) {
      console.error('Error deleting search history:', error);
      showSnackbar(error.response?.data?.error || 'Error removing search history', 'error');
    }
  };

  const handleClearAllHistory = async () => {
    try {
      await axios.delete(
        'https://temperaturetrail.onrender.com/api/search-history',
        { withCredentials: true }
      );
      setSearchHistory([]);
      showSnackbar('Search history cleared successfully');
    } catch (error) {
      console.error('Error clearing search history:', error);
      showSnackbar(error.response?.data?.error || 'Error clearing search history', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: isSmallScreen ? 2 : 4,
          minHeight: '100vh',
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(
            theme.palette.background.default,
            0.9
          )})`
        }}
      >
        <Typography 
          variant={isSmallScreen ? 'h4' : 'h3'} 
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 4,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Your Profile
        </Typography>

        {/* Favorites Section */}
        <Paper 
          elevation={isSmallScreen ? 1 : 3}
          sx={{ 
            p: 3, 
            mb: 4, 
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)' 
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Favorite Destinations
          </Typography>
          <Grid container spacing={2}>
            {favorites.length === 0 ? (
              <Grid item xs={12}>
                <Typography color="textSecondary">
                  No favorite destinations yet. Add some by clicking the heart icon when searching!
                </Typography>
              </Grid>
            ) : (
              favorites.map((fav, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <Typography variant="h6">{fav.destination}</Typography>
                          <Typography color="textSecondary">Added by: {fav.name}</Typography>
                        </div>
                        <IconButton 
                          onClick={() => handleDeleteFavorite(fav.destination)}
                          size="small"
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.1)
                            }
                          }}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>

        {/* Search History Section */}
        <Paper 
          elevation={isSmallScreen ? 1 : 3}
          sx={{ 
            p: 3,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)' 
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">
              Search History
            </Typography>
            {searchHistory.length > 0 && (
              <IconButton
                onClick={handleClearAllHistory}
                color="error"
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.1)
                  }
                }}
              >
                <Trash2 size={24} />
              </IconButton>
            )}
          </Box>
          <Grid container spacing={2}>
            {searchHistory.length === 0 ? (
              <Grid item xs={12}>
                <Typography color="textSecondary">
                  No search history yet. Start by searching for some destinations!
                </Typography>
              </Grid>
            ) : (
              searchHistory.map((search, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <Typography variant="h6">{search.destination}</Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography>Temperature: {search.weather?.temperature}°C</Typography>
                          <Typography>Humidity: {search.weather?.humidity}%</Typography>
                          <Typography>Conditions: {search.weather?.conditions}</Typography>
                          {search.weather?.icon && (
                            <img 
                              src={search.weather.icon} 
                              alt="Weather icon"
                              style={{ width: 50, height: 50 }}
                            />
                          )}
                          <Typography 
                            variant="caption" 
                            display="block" 
                            sx={{ mt: 1, color: theme.palette.text.secondary }}
                          >
                            Searched on: {new Date(search.timestamp).toLocaleString()}
                          </Typography>
                        </div>
                        <IconButton 
                          onClick={() => handleDeleteSearch(search._id)}
                          size="small"
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.1)
                            }
                          }}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Profile;