import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Upload from '../components/Upload';
import Phone from '../components/Phone';
import Nav from '../components/Nav';
import useLocalStorage from '../hooks/useLocalStorage';
import Onboarding from '../components/Onboarding';
import useMedia from '../hooks/useMedia';
import ResponsiveImage from '../assets/responsive.svg';

const useStyles = makeStyles(() => ({
  innerContainer: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    minHeight: '100vh',
    maxWidth: '1200px',
    width: '100%',
  },
  outerContainer: {
    backgroundColor: '#0b0033',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  onboardingMainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  responsiveImage: {
    height: '150px',
  },
  responsiveHeading: {
    fontSize: '2rem',
    marginBottom: '25px',
    marginTop: '25px',
  },
  responsiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '90%',
  },
}));

const Application = (): JSX.Element => {
  const classes = useStyles();
  const [processId, setProcessId] = useState('');
  const [applications, setApplications] = useLocalStorage('applications', []);
  const [hasOnboarded, setHasOnboarded] = useLocalStorage(
    'hasOnboarded',
    false,
  );

  const size = useMedia(
    ['(max-width: 420px)', '(min-width: 400px)'],
    ['small', 'large'],
    'large',
  );

  console.log({ size });

  const handleInputChange = (e: { target: HTMLInputElement }): void => {
    if (!e.target.files[0]) {
      return;
    }
    const data = new FormData();
    data.append('file', e.target.files[0]);

    fetch('/upload', { method: 'POST', body: data })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((res) => setProcessId(res.processId))
            .catch((fetchError) => console.error(fetchError));
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (processId) {
      const statusInterval = setInterval(() => {
        fetch(`/status?id=${processId}`)
          .then((response) => {
            if (response.status === 200) {
              response
                .json()
                .then((res) => {
                  setApplications([...res]);
                  setProcessId('');
                  clearInterval(statusInterval);
                })
                .catch((e) => console.error(e));
            }
          })
          .catch((e) => console.error(e));
      }, 2000);
    }
  }, [processId]);

  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.innerContainer}>
        <Nav />
        {size === 'small' && (
          <Box className={`main ${classes.responsiveContainer}`}>
            <img
              alt="Please use Colorange on a larger device."
              className={classes.responsiveImage}
              src={ResponsiveImage}
            />
            <Typography className={classes.responsiveHeading} variant="h2">
              This device isn't large enough.
            </Typography>
            <Typography variant="body1">
              We're sorry. Colorange works best on larger devices like desktops
              or laptops. Please access Colorange from a larger device. We are
              adding mobile support in future updates soon. Thank you for
              understanding.
            </Typography>
          </Box>
        )}
        {size !== 'small' && (
          <Box
            className={`main ${
              !hasOnboarded
                ? classes.onboardingMainContainer
                : classes.mainContainer
            }`}
          >
            {!hasOnboarded && <Onboarding setHasOnboarded={setHasOnboarded} />}
            {hasOnboarded && (
              <>
                <Upload
                  handleInputChange={handleInputChange}
                  processId={processId}
                />
                {processId && <Typography variant="body1">LOADING</Typography>}
                <Phone applications={applications} processId={processId} />
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Application;
