import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  alpha,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Favourites', path: '/favourites' },
    { text: 'About', path: '/about' },
    { text: 'Contact Us', path: '/contact' }
  ];

  const profileMenuItems = [
    { text: 'Login/Sign up', path: '/login' },
    { text: 'History', path: '/history' }
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.95)}, ${alpha(
            theme.palette.primary.dark,
            0.95
          )})`,
          backdropFilter: 'blur(8px)',
          boxShadow: `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: 1,
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              background: `linear-gradient(45deg, ${theme.palette.common.white}, ${alpha(
                theme.palette.common.white,
                0.8
              )})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Tra
          </Typography>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              mx: { xs: 2, sm: 4 },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'white',
                  px: { xs: 1.5, sm: 2 },
                  py: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: 2,
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'translateY(-2px)',
                    '&::after': {
                      width: '80%',
                    },
                  },
                  '&.active': {
                    '&::after': {
                      width: '80%',
                    },
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Stack>

          {/* Profile */}
          <Box>
            <IconButton
              onClick={handleProfileClick}
              sx={{
                color: 'white',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'profile-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiPaper-root': {
                  mt: 1,
                  minWidth: 180,
                  backgroundImage: `linear-gradient(to bottom right, ${alpha(
                    theme.palette.primary.main,
                    0.95
                  )}, ${alpha(theme.palette.primary.dark, 0.95)})`,
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                },
              }}
            >
              {profileMenuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleClose}
                  sx={{
                    color: 'white',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;