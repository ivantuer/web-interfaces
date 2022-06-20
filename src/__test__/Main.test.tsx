/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';

import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

import { Main } from '../pages/Main';
import client from '../services/axios';
import { renderWithProviders } from './utils';

const mock = new MockAdapter(client);

test('gets alarms', async () => {
  const { getByTestId } = renderWithProviders(<Main />);

  mock
    .onGet('http://localhost:5000/alarm')
    .reply(200, [{ id: 1, time: '00-00-00', active: true }]);

  await waitFor(() => {
    expect(getByTestId('alarm-container')).toBeInTheDocument();
  });
});

test('add alarm', async () => {
  const { getAllByTestId, getByTestId } = renderWithProviders(<Main />);

  mock
    .onGet('http://localhost:5000/alarm')
    .reply(200, [{ id: 1, time: '00-00-00', active: true }]);

  mock
    .onPost('http://localhost:5000/alarm')
    .reply(200, { id: 3, time: '00-00-00', active: true });

  userEvent.click(getByTestId('add-button'));

  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(getAllByTestId('alarm-container').length).toBe(2);
  });
});

test('updates alarm', async () => {
  const { getByTestId } = renderWithProviders(<Main />);

  mock
    .onGet('http://localhost:5000/alarm')
    .reply(200, [{ id: 1, time: '00-00-00', active: true }]);

  mock
    .onPut('http://localhost:5000/alarm')
    .reply(200, { id: 1, time: '00-00-00', active: false });

  await waitFor(() => {
    userEvent.click(getByTestId('alarm-switch'));
    expect(getByTestId('alarm-switch').querySelector('input')).toBeChecked();
  });

  await waitFor(() => {
    expect(mock.history.put.length).toBe(1);
  });
});

test('deletes alarm', async () => {
  const { queryByTestId, getByTestId } = renderWithProviders(<Main />);

  mock
    .onGet('http://localhost:5000/alarm')
    .reply(200, [{ id: '10', time: '00-00-00', active: true }]);

  mock
    .onDelete('http://localhost:5000/alarm/10')
    .reply(200, { id: '10', time: '00-00-00', active: false });

  await waitFor(() => {
    userEvent.click(getByTestId('alarm-delete'));
  });

  await waitFor(async () => {
    expect(mock.history.delete.length).toBe(1);
    expect(queryByTestId('alarm-container')).not.toBeInTheDocument();
  });
});

export {};
