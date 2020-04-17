import * as React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppPage from './AppPage';

// import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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

    let newPages = [];
    while (sorted.length) {
      newPages.push(sorted.splice(0, 24));
    }
    setPages(newPages);
    setApps(newPages[0]);
  }, [sorted]);

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
            index={page}
          >
            {pages.map((appSet, i) => (
              <AppPage appSet={appSet} key={i} />
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={pages.length}
            position="static"
            variant="text"
            activeStep={page}
            nextButton={
              <Button
                size="small"
                onClick={() => setPage(page + 1)}
                disabled={page === pages.length - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Paper>
      )}
    </Box>
  );
};

export default Phone;
