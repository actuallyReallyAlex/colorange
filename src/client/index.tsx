/* global document, fetch, FormData */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import iPhoneImage from './assets/iphone.png';
import ColorangeIcon from './assets/colorange.svg';

import './index.css';

Sentry.init({
  dsn:
    'https://ffed4c5192a74b1691116f224bb787ef@o202486.ingest.sentry.io/5202072',
});

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  input: {
    display: 'none',
  },
  title: {
    marginLeft: '25px',
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();

  const [sorted, setSorted] = useState(null);
  const [processId, setProcessId] = useState('');

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
    <Box>
      <Box className={classes.header}>
        <ColorangeIcon height="100px" width="100px" />
        <Typography className={classes.title} variant="h1">
          colorange
        </Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <input
          accept=".csv"
          className={classes.input}
          disabled={processId !== ''}
          id="file"
          onChange={handleInputChange}
          type="file"
        />
        <label htmlFor="file">
          <Button
            disabled={processId !== ''}
            color="primary"
            component="span"
            id="upload-button"
            variant="contained"
          >
            Upload
          </Button>
        </label>
      </Box>

      {processId && <Typography variant="body1">LOADING</Typography>}
      <img
        alt="iPhone"
        src={iPhoneImage}
        style={{
          left: 'calc(50% - 250px)',
          position: 'absolute',
          width: '500px',
        }}
      />
      {sorted && (
        <div
          id="application-container"
          style={{
            display: 'grid',
            height: '975.031px',
            gridGap: '26px',
            gridTemplateColumns: '80px 80px 80px 80px',
            gridTemplateRows: '80px 80px 80px 80px',
            left: 'calc(50% - 250px)',
            padding: '50px',
            position: 'absolute',
            width: '400px',
          }}
        >
          {sorted.map(({ icon, name }, i) => (
            <div
              key={i}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '80px',
                width: '80px',
              }}
            >
              <img
                src={`data:image/jpeg;base64,${icon.base64}`}
                style={{ borderRadius: '10%', height: '80px', width: '80px' }}
              />
              <span
                style={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
