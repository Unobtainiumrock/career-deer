import React from "react";
import './HomePageJumbo.css';
import { Grid, Typography, Button, Box } from '@mui/material';
import { Fade, Zoom, Grow } from '@mui/material';
import Link from '@mui/material/Link';

const HomePageJumbo = () => (
  <Fade in timeout={2000}>
    <Box className="home-jumbotron p-0" sx={{ width: '100%' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} sx={{ pl: 5, mt: 5 }}>
          <Zoom in style={{ transitionDelay: '500ms' }}>
            <Typography variant="h1" className="main-heading font-weight-bold montserrat" align="left">Don't be a deer in headlights...</Typography>
          </Zoom>
          <Typography variant="h4" className="sub-heading font-italic montserrat">Track down your next job with CareerDeer</Typography>
          
          <Typography className="heading-lead roboto" paragraph>
            We’ll turn you from the hunted into the hunter and help you track down the job of your dreams. The job hunt is a challenging and scary process. There’s a lot of names to keep track of and even more dates. We provide you with a single location to organize and schedule your progress. There's even job search functionality so you can look at job listings without leaving our site and get reminders when your interviews are coming up.
          </Typography>
          <Link href="#about" underline="none">
            <Button variant="contained" color="secondary">
              <span className="montserrat">Learn More</span>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grow in timeout={1700}>
            <img className="main-deer" src="/imgs/logo-white.svg" alt="career deer logo white"/>
          </Grow>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className="home-jumbotron-small p-0">
        <Grid item xs={12}>
          <Typography variant="h1" className="montserrat font-weight-bold text-center mobile-heading">Don't be a deer in headlights...</Typography>
          <Typography variant="h4" className="font-italic montserrat text-center">Track down your next job with CareerDeer</Typography>
        </Grid>
        <Grid item xs={12}>
          <img className="main-deer" src="/imgs/logo-white.svg" alt="career deer logo white"/>
        </Grid>
      </Grid>
      <span id="about"></span>
    </Box>
  </Fade>
);

export { HomePageJumbo };
