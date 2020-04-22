import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hero from '../components/Hero';
import Nav from '../components/Nav';

const useStyles = makeStyles(() => ({
  landingContainer: {},
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Box className={classes.landingContainer}>
      <Nav />
      <Hero />
    </Box>
  );
};

export default Landing;
