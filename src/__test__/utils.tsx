import { render } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProviders = (component: ReactElement) => {
  const ComponentInProviders: FC<any> = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return render(component, { wrapper: ComponentInProviders });
};
