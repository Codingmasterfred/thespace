import theme from './Styling/theme';
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import FlexBetween from './components/FlexBetween';
import { useState, useEffect } from 'react';
import { themeProvider}



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

    )

}







