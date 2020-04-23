import * as React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Nav from '../components/Nav';
import ListImage from '../assets/list.svg';
import DatabaseImage from '../assets/database.svg';
import AnalysisImage from '../assets/analysis.svg';
import SpeedImage from '../assets/speed.svg';
import AboutFeatureGroup from '../components/AboutFeatureGroup';
import GitHub from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  bareLink: {
    color: 'white',
    textDecoration: 'none',
  },
  centerContainer: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  ctaContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    marginBottom: '75px',
    width: '50%',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '20px',
  },
  howContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px',
    marginTop: '50px',
  },
  innerContainer: {
    margin: '0 auto',
    maxWidth: '1200px',
    width: '100%',
  },
  outerContainer: {
    backgroundColor: '#0b0033',
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  subHeading: {
    fontSize: '2rem',
  },
}));

export interface AboutProps {}

const About: React.SFC<AboutProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.innerContainer}>
        <Nav simple />
        <Box className={`main ${classes.centerContainer}`}>
          <Typography className={classes.heading} variant="h1">
            About
          </Typography>
          <Typography className={classes.subHeading} variant="h2">
            Colorange is an opensource tool to help you organize your
            applications on your phone by color.
          </Typography>
          <Box className={classes.howContainer}>
            <AboutFeatureGroup
              features={[
                {
                  description:
                    'Colorange accepts a list of your iPhone applications in CSV format.',
                  imageAlt: 'List of applications.',
                  imageSrc: ListImage,
                },
                {
                  description:
                    'The iOS database is queried for each application, ensuring the latest icon results.',
                  imageAlt: 'iOS Database.',
                  imageSrc: DatabaseImage,
                },
              ]}
            />

            <AboutFeatureGroup
              features={[
                {
                  description:
                    'Each image is analyzed with a specialized algorithm in order to decide what is the most vibrant and common color in the image.',
                  imageAlt: 'Colorange analysis.',
                  imageSrc: AnalysisImage,
                },
                {
                  description:
                    "Processed results are stored in the Colorange Database so that the next user's load time will be even faster!",
                  imageAlt: 'Faster loading times!',
                  imageSrc: SpeedImage,
                },
              ]}
            />
          </Box>

          <Box className={classes.ctaContainer}>
            <Link className={classes.bareLink} id="about-cta-primary" to="/app">
              <Button color="primary" variant="contained">
                Organize Your Phone
              </Button>
            </Link>
            <Button
              color="secondary"
              id="about-cta-secondary"
              onClick={() =>
                window.open(
                  'https://github.com/alexlee-dev/colorange',
                  '_blank',
                )
              }
              startIcon={<GitHub />}
              variant="contained"
            >
              View Source Code
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
