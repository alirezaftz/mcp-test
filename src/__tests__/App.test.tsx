import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App Component', () => {
  test('should render without crashing', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('should render HelloWorld component', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test('should have correct main class', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('app');
  });
});