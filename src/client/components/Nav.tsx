import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Header from './Header';

const useStyles = makeStyles(() => ({
  innerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  leftLinksContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  link: { color: 'white', textDecoration: 'none' },
  linkText: { marginLeft: '60px', marginRight: '60px' },
  outerContainer: {
    backgroundColor: '#0b0033',
    color: 'white',
    display: 'flex',
    padding: '30px 0',
  },
}));

export interface Props {
  simple?: boolean;
}

const Nav: React.SFC<Props> = ({ simple }) => {
  const classes = useStyles();

  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.innerContainer}>
        <Box className={classes.leftLinksContainer}>
          <Header />
          {!simple && (
            <Link className={classes.link} to="/about">
              <Typography className={classes.linkText}>How It Works</Typography>
            </Link>
          )}
        </Box>
        {!simple && (
          <Link className={classes.link} to="/login">
            <Typography>Log In</Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
