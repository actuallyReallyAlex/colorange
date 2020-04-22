import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ColorangeIcon from '../assets/colorange.svg';

const useStyles = makeStyles(() => ({
  header: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    textDecoration: 'none',
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
    <Link className={classes.header} to="/">
      <img alt="colorange" className={classes.icon} src={ColorangeIcon} />
      <Typography className={classes.title} variant="h2">
        colorange
      </Typography>
    </Link>
  );
};

export default Header;
