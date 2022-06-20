/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

import { Login } from '../pages/Login';
import client from '../services/axios';
import { renderWithProviders } from './utils';

const mockHistoryPush = jest.fn();
const mock = new MockAdapter(client);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

test('loads and displays all fields', async () => {
  renderWithProviders(<Login />);

  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('password-field')).toBeInTheDocument();
});

test('changes field', async () => {
  const { getByTestId } = renderWithProviders(<Login />);

  userEvent.type(getByTestId('email-field'), 'email@email.com');
  userEvent.type(getByTestId('password-field'), 'password');

  expect(getByTestId('email-field')).toHaveValue('email@email.com');
  expect(getByTestId('password-field')).toHaveValue('password');
});

test('logges in', async () => {
  const { getByTestId } = renderWithProviders(<Login />);

  userEvent.type(getByTestId('email-field'), 'email@email.com');
  userEvent.type(getByTestId('password-field'), 'password');

  userEvent.click(getByTestId('submit-button'));

  mock.onPost('http://localhost:5000/auth/login').reply(200, {});

  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/', { replace: true });
  });
});

export {};
