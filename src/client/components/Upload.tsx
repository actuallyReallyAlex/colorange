import * as React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    display: 'none',
  },
}));

const Upload = ({ handleInputChange, processId }) => {
  const classes = useStyles();

  return (
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
  );
};

export default Upload;
