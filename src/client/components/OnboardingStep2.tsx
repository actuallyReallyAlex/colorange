import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  step2Container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  step2CTAContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '50px',
  },
}));

export interface OnboardingStep2Props {
  setCurrentStep: Function;
}

const OnboardingStep2: React.SFC<OnboardingStep2Props> = ({
  setCurrentStep,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.step2Container}>
      <Typography variant="body1">
        Open Apple Configurator 2 and connect your phone via USB cable.
      </Typography>
      <Typography variant="body1">
        Select "Actions" > "Export" > "Info"
      </Typography>
      <Typography variant="body1">Export as a CSV and save.</Typography>
      <Box className={classes.step2CTAContainer}>
        <Button
          color="primary"
          id="onboarding-primary-2"
          onClick={() => setCurrentStep(2)}
          variant="contained"
        >
          I have exported my application list
        </Button>
        <Button
          color="secondary"
          onClick={() => setCurrentStep(0)}
          variant="contained"
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingStep2;
