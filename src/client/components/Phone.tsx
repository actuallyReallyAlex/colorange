import * as React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppPage from './AppPage';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '25px',
  },
  paper: {
    width: '375px',
  },
}));

const Phone = ({ processId, sorted }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [apps, setApps] = React.useState([]);
  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    if (!sorted) {
      setApps([]);
      return;
    }

    setApps([...sorted].slice(0, 24));
    setPages([
      [...sorted].slice(0, 24),
      [...sorted].slice(24, 48),
      [...sorted].slice(48, 62),
    ]);
  }, [sorted]);

  console.log({ pages });

  return (
    <Box className={classes.container}>
      {!processId && !sorted && (
        <Typography variant="body1">
          Upload a csv document to see the sorted applications
        </Typography>
      )}
      {sorted && (
        <Paper className={classes.paper} elevation={5}>
          <SwipeableViews
            containerStyle={{ height: '510px' }} // ? How do I fix this. Don't want any scrolling, but shouldn't have to set it like this
            enableMouseEvents
            index={0}
          >
            {pages.map((appSet, i) => (
              <AppPage appSet={appSet} key={i} />
            ))}
          </SwipeableViews>
        </Paper>
      )}
    </Box>
  );
};

export default Phone;
