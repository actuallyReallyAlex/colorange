import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import Header from './components/Header';
import Upload from './components/Upload';
import Phone from './components/Phone';

const App = (): JSX.Element => {
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
      <Header />
      <Upload handleInputChange={handleInputChange} processId={processId} />

      {processId && <Typography variant="body1">LOADING</Typography>}

      <Phone sorted={sorted} />
    </Box>
  );
};

export default App;
