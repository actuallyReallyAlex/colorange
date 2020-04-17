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
    top: '0',
    width: '100vw',
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
    color: 'white',
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

  return (
    <Box className={classes.heroContainer}>
      <Box className={classes.heroInnerContainer}>
        <Box className={classes.heroTypographyContainer}>
          <Typography className={classes.heroHeading} variant="h1">
            Your phone is unorganized. Fix it.
          </Typography>
          <Typography className={classes.heroSubheading} variant="h2">
            Colorange will make it better.
          </Typography>
        </Box>
        <HeroImage className={classes.heroImage} viewBox="-350 -150 1 1000" />
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
