import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '80px',
    width: '80px',
  },
  appImage: {
    borderRadius: '12px',
    height: '60px',
    margin: '0 auto',
    width: '60px',
  },
  appName: {
    overflow: 'auto',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {
    display: 'grid',
    gridRowGap: '20px',
    gridTemplateColumns: '80px 80px 80px 80px',
    gridTemplateRows: '80px 80px 80px 80px',
    marginBottom: '20px',
    marginLeft: '28.5px',
    marginTop: '20px',
  },
}));

const AppPage = ({ appSet }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {appSet.map(({ icon, name }, i) => (
        <Box className={classes.app} key={i}>
          <img
            alt={name}
            className={classes.appImage}
            src={`data:image/jpeg;base64,${icon.base64}`}
          />
          <Typography className={classes.appName} variant="caption">
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AppPage;
