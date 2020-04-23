import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  onboardingContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  stepper: {
    marginBottom: '50px',
  },
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

export interface OnboardingProps {
  setHasOnboarded: Function;
}

const Onboarding: React.SFC<OnboardingProps> = () => {
  const classes = useStyles();
  const [currentStep, setCurrrentStep] = React.useState(0);

  const steps = {
    0: () => (
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
          <Button
            color="secondary"
            onClick={() => setCurrrentStep(1)}
            variant="contained"
          >
            I have installed Apple Configurator 2
          </Button>
        </Box>
      </Box>
    ),
    1: () => <span>STEP 2</span>,
    2: () => <span>STEP 3</span>,
  };

  return (
    <Box className={classes.onboardingContainer}>
      <Stepper activeStep={currentStep} className={classes.stepper}>
        <Step>
          <StepLabel>Install Apple Configurator 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step Two</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step Three</StepLabel>
        </Step>
      </Stepper>
      {steps[currentStep]()}
    </Box>
  );
};

export default Onboarding;
