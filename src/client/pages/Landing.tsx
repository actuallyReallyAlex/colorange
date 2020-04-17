import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../components/Hero';

const useStyles = makeStyles(() => ({
  landingContainer: {},
}));

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
