import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeroImage from '../assets/hero.svg';

const useStyles = makeStyles(() => ({
  heroContainer: {
    backgroundColor: '#0b0033',
    display: 'flex',
    height: '90vh',
  },
  heroHeading: {
    fontWeight: 700,
    marginBottom: '20px',
  },
  heroImage: {
    height: '500px',
    position: 'absolute',
    right: '0',
    zIndex: 1,
  },
  heroImageContainer: {
    color: 'white',
    width: '33%',
  },
  heroInnerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '1200px',
  },
  heroTypographyContainer: {
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50px',
    color: 'white',
    padding: '25px',
    width: '67%',
    zIndex: 2,
  },
  heroSubheading: {
    color: 'rgba(255,255,255,.5)',
    fontSize: '34px',
    marginBottom: '20px',
  },
  landingContainer: {},
}));

const Hero = () => {
  const classes = useStyles();

  const addMarginToImage = () => {
    const container = document.getElementById('hero-inner-container');
    const image = document.getElementById('hero-image');
    const marginLeft = window.getComputedStyle(container).marginLeft;

    image.style.marginRight = marginLeft;
  };

  React.useEffect(() => {
    addMarginToImage();

    window.addEventListener('resize', addMarginToImage);
  }, []);

  return (
    <Box className={classes.heroContainer} id="hero-container">
      <Box className={classes.heroInnerContainer} id="hero-inner-container">
        <Box className={classes.heroTypographyContainer}>
          <Typography className={classes.heroHeading} variant="h1">
            Your phone is unorganized.
          </Typography>
          <Typography className={classes.heroHeading} variant="h1">
            Let's fix it.
          </Typography>
          <Typography className={classes.heroSubheading} variant="h2">
            Colorange will make it better.
          </Typography>
        </Box>
        <img className={classes.heroImage} id="hero-image" src={HeroImage} />
      </Box>
    </Box>
  );
};

const Landing = () => {
  const classes = useStyles();

  return (
    <Box className={classes.landingContainer}>
      <Hero />
      <Link to="/app">App</Link>
    </Box>
  );
};

export default Landing;
