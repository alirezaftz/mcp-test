import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders HelloWorld component with correct props', () => {
    render(<App />);
    
    const heading = screen.getByText('Hello World');
    expect(heading).toBeInTheDocument();
    
    const subtitle = screen.getByText('Welcome to your first React TypeScript application');
    expect(subtitle).toBeInTheDocument();
  });

  test('has correct CSS class for app container', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('app');
  });
});