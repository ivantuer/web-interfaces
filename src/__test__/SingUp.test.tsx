import '@testing-library/jest-dom';

import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

import { SignUp } from '../pages/SignUp';
import * as auth from '../services/auth';
import client from '../services/axios';
import { renderWithProviders } from './utils';

const mockHistoryPush = jest.fn();
const mock = new MockAdapter(client);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
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
  const { getByTestId } = renderWithProviders(<SignUp />);

  userEvent.type(getByTestId('email-field'), 'email@email.com');
  userEvent.type(getByTestId('password-field'), 'password');
  userEvent.type(getByTestId('name-field'), 'name');
  userEvent.type(getByTestId('date-field'), '2000-00-00');

  expect(getByTestId('email-field')).toHaveValue('email@email.com');
  expect(getByTestId('password-field')).toHaveValue('password');
  expect(getByTestId('name-field')).toHaveValue('name');
});

test('sign up', async () => {
  const { getByTestId } = renderWithProviders(<SignUp />);

  userEvent.type(getByTestId('email-field'), 'email@email.com');
  userEvent.type(getByTestId('password-field'), 'password');
  userEvent.type(getByTestId('name-field'), 'name');
  userEvent.type(getByTestId('date-field'), '2000-00-00');

  userEvent.click(getByTestId('button-field'));

  mock.onPost('http://localhost:5000/auth/sign-up').reply(200, {});

  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/', { replace: true });
  });
});

export {};
