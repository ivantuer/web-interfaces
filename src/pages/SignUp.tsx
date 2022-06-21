/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signUp, SignUpBody } from '../services/auth';
import { useAuthStore } from '../store/auth';

export interface Gender {
  label: 'Man' | 'Woman';
}
export const genderValues: Gender[] = [{ label: 'Man' }, { label: 'Woman' }];

const dateInputLabelProps = {
  shrink: true,
};

export const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const onSignUp = useCallback(
    async (values: SignUpBody) => {
      const userResponse = await signUp(values);
      setUser(userResponse.data);
      localStorage.setItem('AUTH_TOKEN', userResponse.data.token);
      navigate('/', { replace: true });
    },
    [navigate, setUser]
  );

  const { setFieldValue, handleChange, handleSubmit } = useFormik<SignUpBody>({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      birthday: '',
      password: '',
    },
    onSubmit: onSignUp,
  });

  const renderAutocompleteInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        name="gender"
        label="Gender"
        placeholder="Gender"
      />
    ),
    []
  );

  const onGenderChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: any, newValue: Gender | null) => {
      setFieldValue('gender', newValue?.label);
    },
    [setFieldValue]
  );

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
          Sign Up
        </Typography>
        <Box
          component={TextField}
          onChange={handleChange}
          name="name"
          fullWidth
          label="Name"
          mt="1em"
          inputProps={{
            'data-testid': 'name-field',
          }}
        />
        <Box
          component={TextField}
          onChange={handleChange}
          name="email"
          fullWidth
          label="email"
          my="1em"
          inputProps={{
            'data-testid': 'email-field',
          }}
        />
        <Box
          component={TextField}
          onChange={handleChange}
          name="password"
          fullWidth
          label="Password"
          mb="1em"
          inputProps={{
            'data-testid': 'password-field',
          }}
        />
        <Autocomplete
          disablePortal
          onChange={onGenderChange}
          options={genderValues}
          renderInput={renderAutocompleteInput}
        />
        <Box
          component={TextField}
          label="Birthday"
          onChange={handleChange}
          name="birthday"
          type="date"
          defaultValue="2000-00-00"
          fullWidth
          mt="1em"
          InputLabelProps={dateInputLabelProps}
          inputProps={{
            'data-testid': 'date-field',
          }}
        />

        <Box
          component={Button}
          mt="1em"
          mb="0.5em"
          variant="contained"
          fullWidth
          type="submit"
          data-testid="button-field"
        >
          Sign Up
        </Box>
        <Typography align="right">
          <Link to="/login">Already have an account? Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
};
