import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  step1Container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  step1CTAContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '50px',
  },
}));

export interface OnboardingStep1Props {
  setCurrentStep: Function;
}

const OnboardingStep1: React.SFC<OnboardingStep1Props> = ({
  setCurrentStep,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.step1Container}>
      <Typography variant="body1">
        Apple Configurator 2 is a program used to export a list of your
        installed applications in the format Colorange needs.
      </Typography>
      <Typography variant="body1">
        Return to this page when the application is installed.
      </Typography>
      <Box className={classes.step1CTAContainer}>
        <Button
          color="primary"
          id="onboarding-primary-1"
          onClick={() => setCurrentStep(1)}
          variant="contained"
        >
          I have installed Apple Configurator 2
        </Button>
        <Button
          color="secondary"
          onClick={() =>
            window.open(
              'https://apps.apple.com/us/app/apple-configurator-2/id1037126344?mt=12',
              '_blank',
            )
          }
          variant="contained"
        >
          Visit Apple Configurator 2
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingStep1;
