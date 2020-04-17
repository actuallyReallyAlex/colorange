import * as React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  app: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '60px',
    width: '60px',
  },
  appImage: { borderRadius: '10%', height: '60px', width: '60px' },
  appName: {
    fontSize: '12px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {
    display: 'grid',
    gridGap: '26px',
    gridTemplateColumns: '60px 60px 60px 60px',
    gridTemplateRows: '60px 60px 60px 60px',
    marginLeft: '28.5px',
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
          <span className={classes.appName}>{name}</span>
        </Box>
      ))}
    </Box>
  );
};

export default AppPage;
