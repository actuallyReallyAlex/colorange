import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Upload from '../components/Upload';
import Phone from '../components/Phone';
import Nav from '../components/Nav';
import useLocalStorage from '../hooks/useLocalStorage';

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
}));

const Application = (): JSX.Element => {
  const classes = useStyles();
  const [sorted, setSorted] = useState(null);
  const [processId, setProcessId] = useState('');
  const [applications, setApplications] = useLocalStorage('applications', []);

  useEffect(() => {
    console.log(applications.length);
    debugger;
  }, [applications]);

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
                  setSorted(res);
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
        <Box className={`main ${classes.mainContainer}`}>
          <Upload handleInputChange={handleInputChange} processId={processId} />
          {processId && <Typography variant="body1">LOADING</Typography>}
          <Phone
            applications={applications}
            processId={processId}
            // sorted={sorted}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Application;
