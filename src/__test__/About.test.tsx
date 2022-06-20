import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { About } from '../pages/About';

test('loads and render correctly', async () => {
  render(<About />);

  expect(screen.getByTestId('about-alarm-image')).toBeInTheDocument();
  expect(screen.getByTestId('about-alarm-text')).toBeInTheDocument();
});

export {};
