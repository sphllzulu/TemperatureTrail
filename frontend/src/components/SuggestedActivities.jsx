// import React from 'react';
// import {
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Box,
// } from '@mui/material';

// const SuggestedActivities = ({ activities }) => {
//   if (!activities || activities.length === 0) {
//     return null;
//   }

//   return (
//     <Box sx={{ marginBottom: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Suggested Activities
//       </Typography>
//       <Grid container spacing={2}>
//         {activities.map((activity, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{activity.name}</Typography>
//                 <Typography>Rating: {activity.rating}</Typography>
//                 <Typography>Address: {activity.address}</Typography>
//                 {activity.photo && (
//                   <img src={activity.photo} alt={activity.name} style={{ width: '100%' }} />
//                 )}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   href={activity.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Learn More
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default SuggestedActivities;

// import React from 'react';
// import { useState, useEffect} from 'react';
// import {
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Box,
//   useTheme,
//   IconButton
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// const SuggestedActivities = ({ activities }) => {
//   const [favorites, setFavorites] = useState([]);
//   const theme = useTheme();
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (userId) {
//       const storedFavorites = localStorage.getItem(`favorites_${userId}`);
//       if (storedFavorites) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     }
//   }, [userId]);

//   const isActivityInFavorites = (activity) => {
//     return favorites.some(fav => 
//       fav.name === activity.name && 
//       fav.address === activity.address
//     );
//   };

//   const handleFavoriteClick = (activity) => {
//     if (!userId) {
//       // Handle not logged in case
//       alert('Please log in to save favorites');
//       return;
//     }

//     let updatedFavorites;
//     if (isActivityInFavorites(activity)) {
//       // Remove from favorites
//       updatedFavorites = favorites.filter(fav => 
//         !(fav.name === activity.name && fav.address === activity.address)
//       );
//     } else {
//       // Add to favorites
//       updatedFavorites = [...favorites, {
//         ...activity,
//         savedAt: new Date().toISOString()
//       }];
//     }

//     // Update state and localStorage
//     setFavorites(updatedFavorites);
//     localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
//   };

//   if (!activities || activities.length === 0) {
//     return null;
//   }

//   return (
//     <Box sx={{ marginBottom: 4 }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           color: theme.palette.primary.main,
//           mb: 3,
//         }}
//       >
//         Suggested Activities
//       </Typography>
//       <Grid container spacing={3}>
//         {activities.map((activity, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 600,
//                       color: theme.palette.text.primary,
//                     }}
//                   >
//                     {activity.name}
//                   </Typography>
//                   <IconButton
//                     onClick={() => handleFavoriteClick(activity)}
//                     sx={{
//                       color: isActivityInFavorites(activity) 
//                         ? theme.palette.error.main 
//                         : theme.palette.primary.main,
//                     }}
//                   >
//                     {isActivityInFavorites(activity) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                   </IconButton>
//                 </Box>
//                 <Typography
//                   variant="body1"
//                   sx={{ mb: 1, color: theme.palette.text.secondary }}
//                 >
//                   Rating: {activity.rating}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   sx={{ mb: 2, color: theme.palette.text.secondary }}
//                 >
//                   Address: {activity.address}
//                 </Typography>
//                 {activity.photo && (
//                   <Box
//                     sx={{
//                       width: '100%',
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       mb: 2,
//                     }}
//                   >
//                     <img
//                       src={activity.photo}
//                       alt={activity.name}
//                       style={{ width: '100%', height: 'auto', display: 'block' }}
//                     />
//                   </Box>
//                 )}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   href={activity.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   fullWidth
//                   sx={{
//                     mt: 1,
//                     py: 1,
//                     fontWeight: 600,
//                     borderRadius: 1,
//                     transition: 'transform 0.2s ease-in-out',
//                     '&:hover': {
//                       transform: 'scale(1.05)',
//                     },
//                   }}
//                 >
//                   Learn More
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default SuggestedActivities;

import React from 'react';
import { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  IconButton,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SuggestedActivities = ({ activities }) => {
  const [favorites, setFavorites] = useState([]);
  const theme = useTheme();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      const storedFavorites = localStorage.getItem(`favorites_${userId}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [userId]);

  const isActivityInFavorites = (activity) => {
    return favorites.some(fav => 
      fav.name === activity.name && 
      fav.address === activity.address
    );
  };

  const handleFavoriteClick = (activity) => {
    if (!userId) {
      // Handle not logged in case
      alert('Please log in to save favorites');
      return;
    }

    let updatedFavorites;
    if (isActivityInFavorites(activity)) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => 
        !(fav.name === activity.name && fav.address === activity.address)
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, {
        ...activity,
        savedAt: new Date().toISOString()
      }];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
  };

  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#ffffff', // White text for contrast
          mb: 3,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Glow effect
        }}
      >
        Suggested Activities
      </Typography>
      <Grid container spacing={3}>
        {activities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                background: alpha('#ffffff', 0.1), // Transparent white background
                backdropFilter: 'blur(10px)', // Blur effect
                border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#ffffff', // White text for contrast
                    }}
                  >
                    {activity.name}
                  </Typography>
                  <IconButton
                    onClick={() => handleFavoriteClick(activity)}
                    sx={{
                      color: isActivityInFavorites(activity) 
                        ? theme.palette.error.main 
                        : '#ffffff', // White icon for contrast
                      '&:hover': {
                        color: theme.palette.error.main, // Red on hover
                      },
                    }}
                  >
                    {isActivityInFavorites(activity) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.7)' }} // Semi-transparent white text
                >
                  Rating: {activity.rating}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }} // Semi-transparent white text
                >
                  Address: {activity.address}
                </Typography>
                {activity.photo && (
                  <Box
                    sx={{
                      width: '100%',
                      borderRadius: 1,
                      overflow: 'hidden',
                      mb: 2,
                    }}
                  >
                    <img
                      src={activity.photo}
                      alt={activity.name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Box>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: 1,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Gradient button
                    color: '#ffffff', // White text for contrast
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuggestedActivities;
