// import { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/login',
//         { username, password },
//         { withCredentials: true }
//       );
//       console.log('Logged in:', response.data);
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h3" gutterBottom>
//         Login
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleLogin}>
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post(
            'https://temperaturetrail.onrender.com/api/auth/login',
            { username, password },
            { withCredentials: true }
        );
        
        console.log('Login response:', response.data);
        
        // Wait a brief moment to ensure session is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verify session before navigating
        const sessionCheck = await axios.get(
            'https://temperaturetrail.onrender.com/api/auth/test-session',
            { withCredentials: true }
        );
        
        console.log('Session check:', sessionCheck.data);
        
        if (sessionCheck.data.isAuthenticated) {
            navigate('/');
        } else {
            console.error('Session not established after login');
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Register here
            </Link>
          </Typography>
      </Box>
    </Box>
  );
};

export default Login;