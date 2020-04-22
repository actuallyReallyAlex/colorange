import * as React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Nav from '../components/Nav';
import NotFoundImage from '../assets/404.svg';
import { withRouter } from 'react-router';

const useStyles = makeStyles(() => ({
  centerContainer: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '20px',
  },
  innerContainer: {
    margin: '0 auto',
    maxWidth: '1200px',
    width: '100%',
  },
  outerContainer: {
    backgroundColor: '#0b0033',
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  notFoundImage: {
    height: '300px',
    marginBottom: '20px',
  },
  subHeading: {
    color: 'rgba(255,255,255,.5)',
    fontSize: '34px',
    marginBottom: '20px',
  },
}));

const NotFound = ({ history }) => {
  const classes = useStyles();

  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.innerContainer}>
        <Nav />
        <Box className={classes.centerContainer}>
          <img
            alt="404 - Sorry, we can’t find the page you were looking for."
            className={classes.notFoundImage}
            id="404-image"
            src={NotFoundImage}
          />
          <Typography className={classes.heading} variant="h1">
            Sorry, we can't find the page you were looking for.
          </Typography>
          <Typography className={classes.subHeading} variant="h2">
            404
          </Typography>
          <Button
            color="primary"
            id="back"
            onClick={() => history.goBack()}
            variant="contained"
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(NotFound);
