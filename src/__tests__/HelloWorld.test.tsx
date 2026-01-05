import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelloWorld } from '../components/HelloWorld';

describe('HelloWorld Component', () => {
  describe('Rendering', () => {
    test('renders with required message prop', () => {
      render(<HelloWorld message="Test Message" />);
      
      const heading = screen.getByTestId('hello-world-heading');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Message');
    });

    test('renders with message and subtitle', () => {
      render(<HelloWorld message="Hello" subtitle="This is a subtitle" />);
      
      const heading = screen.getByTestId('hello-world-heading');
      const subtitle = screen.getByTestId('hello-world-subtitle');
      
      expect(heading).toHaveTextContent('Hello');
      expect(subtitle).toHaveTextContent('This is a subtitle');
    });

    test('renders without subtitle when not provided', () => {
      render(<HelloWorld message="Hello" />);
      
      const subtitle = screen.queryByTestId('hello-world-subtitle');
      expect(subtitle).not.toBeInTheDocument();
    });

    test('renders button element', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Say Hello!');
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes on section', () => {
      render(<HelloWorld message="Hello" />);
      
      const section = screen.getByRole('region', { name: 'Hello world greeting section' });
      expect(section).toBeInTheDocument();
    });

    test('has proper ARIA label on button', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByRole('button', { name: 'Click to increment greeting counter' });
      expect(button).toBeInTheDocument();
    });

    test('counter has aria-live attribute for screen readers', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      fireEvent.click(button);
      
      const counter = screen.getByTestId('hello-world-counter');
      expect(counter).toHaveAttribute('aria-live', 'polite');
    });

    test('uses semantic HTML elements', () => {
      render(<HelloWorld message="Hello" />);
      
      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('BEM Class Naming', () => {
    test('uses correct BEM classes for block and elements', () => {
      render(<HelloWorld message="Hello" subtitle="Subtitle" />);
      
      const section = screen.getByTestId('hello-world-section');
      expect(section).toHaveClass('hello-world');
      
      const content = section.querySelector('.hello-world__content');
      expect(content).toBeInTheDocument();
      
      const heading = screen.getByTestId('hello-world-heading');
      expect(heading).toHaveClass('hello-world__heading');
      
      const subtitle = screen.getByTestId('hello-world-subtitle');
      expect(subtitle).toHaveClass('hello-world__subtitle');
      
      const button = screen.getByTestId('hello-world-button');
      expect(button).toHaveClass('hello-world__button');
    });

    test('counter uses correct BEM class', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      fireEvent.click(button);
      
      const counter = screen.getByTestId('hello-world-counter');
      expect(counter).toHaveClass('hello-world__counter');
    });
  });

  describe('Interactivity', () => {
    test('increments counter when button is clicked', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      
      expect(screen.queryByTestId('hello-world-counter')).not.toBeInTheDocument();
      
      fireEvent.click(button);
      
      const counter = screen.getByTestId('hello-world-counter');
      expect(counter).toHaveTextContent("You've said hello 1 time!");
    });

    test('shows correct pluralization for multiple clicks', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      const counter = screen.getByTestId('hello-world-counter');
      expect(counter).toHaveTextContent("You've said hello 3 times!");
    });

    test('calls onGreetingClick callback when provided', () => {
      const mockCallback = jest.fn();
      render(<HelloWorld message="Hello" onGreetingClick={mockCallback} />);
      
      const button = screen.getByTestId('hello-world-button');
      fireEvent.click(button);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
      
      fireEvent.click(button);
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    test('works without onGreetingClick callback', () => {
      render(<HelloWorld message="Hello" />);
      
      const button = screen.getByTestId('hello-world-button');
      
      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();
      
      const counter = screen.getByTestId('hello-world-counter');
      expect(counter).toBeInTheDocument();
    });
  });

  describe('TypeScript Props Validation', () => {
    test('accepts valid props with all optional fields', () => {
      const mockCallback = jest.fn();
      
      expect(() => {
        render(
          <HelloWorld 
            message="Test"
            subtitle="Test Subtitle"
            onGreetingClick={mockCallback}
          />
        );
      }).not.toThrow();
    });

    test('accepts valid props with only required fields', () => {
      expect(() => {
        render(<HelloWorld message="Test" />);
      }).not.toThrow();
    });
  });
});