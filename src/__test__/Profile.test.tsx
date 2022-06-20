/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';

import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Profile } from '../pages/Profile';
import * as auth from '../services/auth';
import { renderWithProviders } from './utils';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

test('loads and displays all fields', async () => {
  const { getByTestId } = renderWithProviders(<Profile />);

  expect(getByTestId('email-field')).toBeInTheDocument();
  expect(getByTestId('name-field')).toBeInTheDocument();
  expect(getByTestId('gender-field')).toBeInTheDocument();
  expect(getByTestId('date-field')).toBeInTheDocument();
});

test('changes field', async () => {
  const { getByTestId } = renderWithProviders(<Profile />);
  userEvent.type(getByTestId('name-field'), 'name');

  expect(getByTestId('name-field')).toHaveValue('name');
});

test('saves updated info', async () => {
  const { getByTestId } = renderWithProviders(<Profile />);

  userEvent.type(getByTestId('name-field'), 'name');
  userEvent.type(getByTestId('date-field'), '2000-00-00');

  userEvent.click(getByTestId('button-field'));

  // @ts-ignore
  const updateMe = jest.spyOn(auth, 'updateMe').mockReturnValueOnce({});

  await waitFor(() => {
    expect(updateMe).toBeCalled();
  });
});

test('log out', async () => {
  const { getByTestId } = renderWithProviders(<Profile />);

  userEvent.click(getByTestId('log-out'));

  await waitFor(() => {
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});

export {};
