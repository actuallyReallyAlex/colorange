import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ColorangeIcon from '../assets/colorange.svg';

const useStyles = makeStyles(() => ({
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    height: '50px',
    width: '50px',
  },
  title: {
    fontSize: '1.5rem',
    marginLeft: '25px',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <img alt="colorange" className={classes.icon} src={ColorangeIcon} />
      <Typography className={classes.title} variant="h2">
        colorange
      </Typography>
    </Box>
  );
};

export default Header;
