import * as React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHub from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';
import Header from './Header';
import useMedia from '../hooks/useMedia';

const useStyles = makeStyles({
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
    padding: '30px',
  },
});

export interface Props {
  simple?: boolean;
}

const Nav: React.SFC<Props> = ({ simple }) => {
  const size = useMedia(
    ['(max-width: 800px)', '(min-width: 800px)'],
    ['small', 'large'],
    'large',
  );
  const classes = useStyles();

  return (
    <Box className={classes.outerContainer} id="nav">
      <Box className={classes.innerContainer}>
        <Box className={classes.leftLinksContainer}>
          <Header />
          {!simple && size !== 'small' && (
            <Link className={classes.link} id="nav-about" to="/about">
              <Typography className={classes.linkText}>How It Works</Typography>
            </Link>
          )}
        </Box>

        <IconButton
          aria-label="GitHub Source"
          onClick={() =>
            window.open('https://github.com/alexlee-dev/colorange', '_blank')
          }
        >
          <GitHub />
        </IconButton>
        {/* {!simple && (
          <Link className={classes.link} to="/login">
            <Typography>Log In</Typography>
          </Link>
        )} */}
      </Box>
    </Box>
  );
};

export default Nav;
