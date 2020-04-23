import * as React from 'react';
import { Box } from '@material-ui/core';
import AboutFeature from './AboutFeature';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  featureGroupContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '25px',
    marginTop: '25px',
  },
}));

interface Feature {
  description: string;
  imageAlt: string;
  imageSrc: string;
}

export interface AboutFeatureGroupProps {
  features: Feature[];
}

const AboutFeatureGroup: React.SFC<AboutFeatureGroupProps> = ({ features }) => {
  const classes = useStyles();

  return (
    <Box className={classes.featureGroupContainer}>
      {features.map((feature: Feature) => (
        <AboutFeature
          description={feature.description}
          imageAlt={feature.imageAlt}
          imageSrc={feature.imageSrc}
        />
      ))}
    </Box>
  );
};

export default AboutFeatureGroup;
