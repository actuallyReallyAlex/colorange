import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Stepper, Step, StepLabel } from '@material-ui/core';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';

const useStyles = makeStyles(() => ({
  onboardingContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  stepper: {
    marginBottom: '50px',
  },
}));

export interface OnboardingProps {
  setHasOnboarded: Function;
}

const Onboarding: React.SFC<OnboardingProps> = ({ setHasOnboarded }) => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = {
    0: () => <OnboardingStep1 setCurrentStep={setCurrentStep} />,
    1: () => <OnboardingStep2 setCurrentStep={setCurrentStep} />,
    2: () => (
      <OnboardingStep3
        setCurrentStep={setCurrentStep}
        setHasOnboarded={setHasOnboarded}
      />
    ),
  };

  return (
    <Box className={classes.onboardingContainer}>
      <Stepper activeStep={currentStep} className={classes.stepper}>
        <Step>
          <StepLabel>Install Apple Configurator 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Connect Phone</StepLabel>
        </Step>
        <Step>
          <StepLabel>Upload Application List</StepLabel>
        </Step>
      </Stepper>
      {steps[currentStep]()}
    </Box>
  );
};

export default Onboarding;
