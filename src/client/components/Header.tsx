import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ColorangeIcon from '../assets/colorange.svg';

const useStyles = makeStyles(() => ({
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    marginLeft: '25px',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <ColorangeIcon height="100px" width="100px" />
      <Typography className={classes.title} variant="h1">
        colorange
      </Typography>
    </Box>
  );
};

export default Header;
