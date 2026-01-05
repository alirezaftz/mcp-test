import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HelloWorld } from '../components/HelloWorld';

describe('HelloWorld Component', () => {
  describe('Rendering', () => {
    test('should render with greeting text', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Hello World');
    });

    test('should render with custom greeting', () => {
      render(<HelloWorld greeting="Welcome!" />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Welcome!');
    });

    test('should render optional message when provided', () => {
      const message = 'This is a test message';
      render(<HelloWorld greeting="Hello" message={message} />);
      
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('should not render message paragraph when message is not provided', () => {
      render(<HelloWorld greeting="Hello" />);
      
      const paragraphs = screen.queryByRole('paragraph');
      expect(paragraphs).not.toBeInTheDocument();
    });

    test('should render Get Started button', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const button = screen.getByRole('button', { name: /get started with the application/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Get Started');
    });
  });

  describe('Semantic HTML and Accessibility', () => {
    test('should use section element with proper role', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const section = screen.getByRole('region', { name: /hello world greeting section/i });
      expect(section).toBeInTheDocument();
    });

    test('should have proper aria-label on section', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');
    });

    test('should have proper aria-label on button', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Get started with the application');
    });
  });

  describe('BEM Class Naming', () => {
    test('should use BEM naming for main section', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('hello-world');
    });

    test('should use BEM naming for content wrapper', () => {
      const { container } = render(<HelloWorld greeting="Hello World" />);
      
      const contentDiv = container.querySelector('.hello-world__content');
      expect(contentDiv).toBeInTheDocument();
    });

    test('should use BEM naming for heading', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('hello-world__heading');
    });

    test('should use BEM naming for message paragraph', () => {
      render(<HelloWorld greeting="Hello" message="Test message" />);
      
      const message = screen.getByText('Test message');
      expect(message).toHaveClass('hello-world__message');
    });

    test('should use BEM naming with modifier for button', () => {
      render(<HelloWorld greeting="Hello World" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hello-world__button');
      expect(button).toHaveClass('hello-world__button--primary');
    });
  });

  describe('Interactivity', () => {
    test('should handle button click', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<HelloWorld greeting="Hello World" />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Get Started button clicked');
      
      consoleLogSpy.mockRestore();
    });

    test('should be keyboard accessible', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<HelloWorld greeting="Hello World" />);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
      
      fireEvent.click(button);
      expect(consoleLogSpy).toHaveBeenCalled();
      
      consoleLogSpy.mockRestore();
    });
  });

  describe('Props Validation', () => {
    test('should accept greeting prop', () => {
      const greeting = 'Custom Greeting';
      render(<HelloWorld greeting={greeting} />);
      
      expect(screen.getByText(greeting)).toBeInTheDocument();
    });

    test('should accept optional message prop', () => {
      const props = {
        greeting: 'Hello',
        message: 'Optional message'
      };
      
      render(<HelloWorld {...props} />);
      
      expect(screen.getByText(props.greeting)).toBeInTheDocument();
      expect(screen.getByText(props.message)).toBeInTheDocument();
    });

    test('should work without optional message prop', () => {
      render(<HelloWorld greeting="Hello" />);
      
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    test('should have correct DOM structure', () => {
      const { container } = render(
        <HelloWorld greeting="Hello" message="Message" />
      );
      
      const section = container.querySelector('.hello-world');
      const content = container.querySelector('.hello-world__content');
      const heading = container.querySelector('.hello-world__heading');
      const message = container.querySelector('.hello-world__message');
      const button = container.querySelector('.hello-world__button');
      
      expect(section).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });
});