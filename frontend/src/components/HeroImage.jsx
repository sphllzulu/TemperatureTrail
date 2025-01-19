import heroImage from './hero.jpg'; // Adjust the path

const StyledHeroSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  backgroundImage: `url(${heroImage})`, // Use the imported image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  marginBottom: theme.spacing(4),
  borderRadius: 0,
}));