/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logIn, LogInBody } from '../services/auth';
import { useAuthStore } from '../store/auth';

export const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const onLogin = useCallback(
    async (values: LogInBody) => {
      const userResponse = await logIn(values);
      setUser(userResponse.data);
      localStorage.setItem('AUTH_TOKEN', userResponse.data.token);
      navigate('/', { replace: true });
    },
    [navigate, setUser]
  );

  const { handleChange, handleSubmit } = useFormik<LogInBody>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onLogin,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Box component={Paper} elevation={2} padding="3em">
        <Typography align="center" variant="h4" component="h4">
          Log In
        </Typography>
        <Box
          //   data-testid="email-field"
          component={TextField}
          name="email"
          onChange={handleChange}
          fullWidth
          inputProps={{
            'data-testid': 'email-field',
          }}
          label="email"
          my="1em"
        />
        <TextField
          //   data-testid="password-field"
          fullWidth
          type="password"
          name="password"
          onChange={handleChange}
          label="password"
          inputProps={{
            'data-testid': 'password-field',
          }}
        />
        <Box
          component={Button}
          mt="1em"
          mb="0.5em"
          variant="contained"
          fullWidth
          data-testid="submit-button"
          type="submit"
        >
          Log In
        </Box>
        <Typography align="right">
          <Link to="/sign-up">Dont have an account? Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};
