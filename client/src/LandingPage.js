import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from './components/FlexBetween';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import axios from 'axios'; // Import Axios for making API requests


function LandingPage() {
  const [isLogin, setIsLogin] = useState(true); // Use isLogin to toggle between login and register forms
  const { palette } = useTheme();

  // Define initial form values and validation schema for login and register
  const initialValuesLogin = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValuesRegister = {
    firstName: '',
    lastName: '',
    location: '',
    occupation: '',
    email: '',
    password: '',
    picture: null, // To store the uploaded picture
  };

  const registerSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    location: Yup.string().required('Location is required'),
    occupation: Yup.string().required('Occupation is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleFormSubmit = (values) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);

    // Send user information to the backend using Axios
    axios.post('http:localhost:3001/freelance', values)
      .then((response) => {
        console.log('User information sent to the backend:', response.data);
        // You can navigate to another page or handle the response as needed
      })
      .catch((error) => {
        console.error('Error sending user information:', error);
        // Handle the error as needed, e.g., display an error message
      });
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            {/* Render fields based on isLogin state */}
            {isLogin ? (
              <TextField
                label="Email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                sx={{ gridColumn: 'span 4' }}
              />
            ) : (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  sx={{ gridColumn: 'span 2' }}
                />
                {/* Add more registration fields here */}
                {/* Picture upload using Dropzone */}
                <Box gridColumn="span 4" border={`1px solid ${palette.primary.main}`} borderRadius="5px" p="1px">
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" sx={{ '&:hover': { cursor: 'pointer' } }}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p> Add your picture here! </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* Common fields for both login and registration */}
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setIsLogin(!isLogin); // Toggle between login and register forms
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin ? "Don't have an account? Sign Up Here!" : 'Already have an account? Log in here'}
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default LandingPage;
