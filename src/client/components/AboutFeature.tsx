import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  aboutImage: {
    height: '150px',
  },
  featureContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    width: '33%',
  },
  featureDescription: {
    marginTop: '25px',
  },
}));

export interface AboutFeatureProps {
  description: string;
  imageAlt: string;
  imageSrc: string;
}

const AboutFeature: React.SFC<AboutFeatureProps> = ({
  description,
  imageAlt,
  imageSrc,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.featureContainer}>
      <img alt={imageAlt} className={classes.aboutImage} src={imageSrc} />
      <Typography className={classes.featureDescription} variant="subtitle1">
        {description}
      </Typography>
    </Box>
  );
};

export default AboutFeature;
