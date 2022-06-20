import '@testing-library/jest-dom';

import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignUp } from '../pages/SignUp';
import * as auth from '../services/auth';
import { renderWithProviders } from './utils';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));
jest.mock('../services/auth', () => ({
  signUp: jest.fn().mockReturnValue(Promise.resolve({})),
}));

test('loads and displays all fields', async () => {
  const { getByTestId } = renderWithProviders(<SignUp />);

  expect(getByTestId('email-field')).toBeInTheDocument();
  expect(getByTestId('password-field')).toBeInTheDocument();
  expect(getByTestId('name-field')).toBeInTheDocument();
  expect(getByTestId('gender-field')).toBeInTheDocument();
  expect(getByTestId('date-field')).toBeInTheDocument();
});

test('changes field', async () => {
  const { getByTitle, getByRole, getByLabelText } = renderWithProviders(
    <SignUp />
  );

  const button = getByTitle('Open');
  userEvent.click(button);

  const option1 = getByRole('option');
  userEvent.click(option1);

  expect(getByLabelText('Gender')).toHaveValue('Man');
});

test('sign up', async () => {
  const { getByTestId } = renderWithProviders(<SignUp />);

  userEvent.type(getByTestId('email-field'), 'email@email.com');
  userEvent.type(getByTestId('password-field'), 'password');
  userEvent.type(getByTestId('name-field'), 'name');
  userEvent.type(getByTestId('date-field'), '2000-00-00');

  userEvent.click(getByTestId('button-field'));

  // @ts-ignore
  const addStub = jest.spyOn(auth, 'signUp').mockReturnValueOnce({});

  await waitFor(() => {
    expect(addStub).toBeCalled();
  });
});

export {};
