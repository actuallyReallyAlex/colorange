import * as React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import HeroImage from '../assets/hero.svg';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  cta: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.2rem',
    textDecoration: 'none',
  },
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
    padding: '25px',
    width: '67%',
    zIndex: 1,
  },
  heroSubheading: {
    color: 'rgba(255,255,255,.5)',
    fontSize: '34px',
    marginBottom: '20px',
  },
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
        <img
          alt="People jumping for joy."
          className={classes.heroImage}
          id="hero-image"
          src={HeroImage}
        />
        <Button color="default" variant="contained">
          <Link className={classes.cta} to="/app">
            Start
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
