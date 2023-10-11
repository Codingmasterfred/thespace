import React, { useState, useEffect } from 'react';
import { Typography, Paper, CircularProgress, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { themeSettings } from './theme';

const theme = createTheme(themeSettings('light'));

const FeedPage = () => {
    const [jobListings, setJobListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect (() =>{

        axios.get('localhost:3001/joblistings')
        .then((response) => {
            setJobListings(response.data);
            setIsLoading(false)
        })
        .catch((error)=>{
            console.error('No Jobs to be found, sorry.', error);
            setIsLoading(false);
        });
    }, []);


    return (
        <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Job Listings
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ul>
              {jobListings.map((job) => (
                <li key={job.id}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body1">{job.description}</Typography>
                </li>
              ))}
            </ul>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default FeedPage;







