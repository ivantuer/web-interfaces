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
          component={TextField}
          name="email"
          onChange={handleChange}
          fullWidth
          label="email"
          my="1em"
        />
        <TextField
          fullWidth
          name="password"
          onChange={handleChange}
          label="password"
        />
        <Box
          component={Button}
          mt="1em"
          mb="0.5em"
          variant="contained"
          fullWidth
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
