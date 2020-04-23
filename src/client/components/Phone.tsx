import * as React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppPage from './AppPage';
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
    // borderImage: 'url(assets/iphone.png) 240',
    // borderStyle: 'solid',
    // borderWidth: '70px',
    borderStyle: 'solid',
    borderWidth: '20px',
    marginBottom: '50px',
    width: '375px',
  },
}));

const Phone = ({ applications, processId }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [apps, setApps] = React.useState([]);
  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    let newPages = [];
    while (applications.length) {
      newPages.push(applications.splice(0, 24));
    }
    setPages(newPages);
    setApps(newPages[0]);
  }, [applications]);

  return (
    <Box className={classes.container}>
      {!processId && pages.length > 0 && (
        <Typography variant="body1">
          Upload a csv document to see the sorted applications
        </Typography>
      )}
      {pages.length > 0 && (
        <Paper
          className={classes.paper}
          elevation={5}
          id="application-container"
        >
          <SwipeableViews enableMouseEvents index={page}>
            {pages.map((appSet, i) => (
              <AppPage appSet={appSet} key={i} />
            ))}
          </SwipeableViews>
          <MobileStepper
            activeStep={page}
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
            position="static"
            steps={pages.length}
            variant="dots"
          />
        </Paper>
      )}
    </Box>
  );
};

export default Phone;
