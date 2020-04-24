import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  step3Container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  step3CTAContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '50px',
  },
}));

export interface OnboardingStep3Props {
  setCurrentStep: Function;
  setHasOnboarded: Function;
}

const OnboardingStep3: React.SFC<OnboardingStep3Props> = ({
  setCurrentStep,
  setHasOnboarded,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.step3Container}>
      <Typography variant="body1">
        Continue on to upload your exported application list to Colorange.
      </Typography>
      <Typography variant="body1">
        Colorange will sort and process the list of applications, and show you
        how to organize your phone.
      </Typography>
      <Box className={classes.step3CTAContainer}>
        <Button
          color="primary"
          id="onboarding-primary-3"
          onClick={() => setHasOnboarded(true)}
          variant="contained"
        >
          Let's get organized!
        </Button>
        <Button
          color="secondary"
          onClick={() => setCurrentStep(1)}
          variant="contained"
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingStep3;
