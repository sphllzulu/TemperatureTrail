// import { Box, Typography, Container } from '@mui/material';
// import Weather from '../components/Weather';

// const Home = () => {
//   return (
//     <Container>
//       <Box sx={{ textAlign: 'center', marginTop: 4 }}>
//         <Typography variant="h2" gutterBottom>
//           Weather-Based Travel Planner
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Plan your trips based on real-time weather conditions
//         </Typography>
//       </Box>
//       <Weather />
//     </Container>
//   );
// };

// export default Home;


import { useState } from 'react';
// import './Home.css';
import Weather from '../';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (city) => {
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="hero-section">
        

        <h3 className="hero-heading">
          
        </h3>

        <div className="weather-container">
          <Weather weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
