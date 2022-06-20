/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateMe, UpdateUserBody } from '../services/auth';
import { useAuthStore } from '../store/auth';
import { Gender, genderValues } from './SignUp';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logOut } = useAuthStore();

  const updateUser = useCallback(
    async (values: UpdateUserBody) => {
      const updatedUser = await updateMe(values);
      setUser(updatedUser.data);
    },
    [setUser]
  );

  const { values, setFieldValue, handleChange, handleSubmit } =
    useFormik<UpdateUserBody>({
      initialValues: {
        name: user?.name || '',
        birthday: user?.birthday
          ? format(new Date(user.birthday), 'yyyy-MM-dd')
          : '',
        gender: user?.gender || '',
      },
      onSubmit: updateUser,
    });

  const renderAutocompleteInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        inputProps={{ 'data-testid': 'gender-field' }}
        label="Gender"
      />
    ),
    []
  );

  const onLogOut = useCallback(() => {
    navigate('/login');
    logOut();
    localStorage.removeItem('AUTH_TOKEN');
  }, [navigate, logOut]);

  const onGenderChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: any, newValue: Gender | null) => {
      setFieldValue('gender', newValue?.label);
    },
    [setFieldValue]
  );

  return (
    <Box minHeight="100vh" component="form" onSubmit={handleSubmit} px="4em">
      <Box
        component={TextField}
        onChange={handleChange}
        name="name"
        fullWidth
        value={values.name}
        label="Name"
        mt="1em"
        inputProps={{
          'data-testid': 'name-field',
        }}
      />
      <Box
        component={TextField}
        value={user?.email}
        disabled
        fullWidth
        label="Email"
        my="1em"
        inputProps={{
          'data-testid': 'email-field',
        }}
      />
      <Box
        component={TextField}
        label="Birthday"
        type="date"
        value={values.birthday}
        onChange={handleChange}
        name="birthday"
        defaultValue="2017-05-24"
        fullWidth
        mb="1em"
        inputProps={{
          'data-testid': 'date-field',
        }}
      />
      <Autocomplete
        disablePortal
        onChange={onGenderChange}
        value={genderValues.find((gender) => gender.label === values.gender)}
        options={genderValues}
        renderInput={renderAutocompleteInput}
      />

      <Box
        component={Button}
        mt="1em"
        mb="0.5em"
        variant="contained"
        fullWidth
        data-testid="button-field"
        type="submit"
      >
        Save
      </Box>
      <Box
        data-testid="log-out"
        component={Button}
        onClick={onLogOut}
        mt="1em"
        mb="0.5em"
        fullWidth
      >
        Log Out
      </Box>
    </Box>
  );
};
