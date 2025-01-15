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

import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
} from '@mui/material';

const SuggestedActivities = ({ activities }) => {
  const theme = useTheme();

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
          color: theme.palette.primary.main,
          mb: 3,
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
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {activity.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: theme.palette.text.secondary }}
                >
                  Rating: {activity.rating}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: theme.palette.text.secondary }}
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
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