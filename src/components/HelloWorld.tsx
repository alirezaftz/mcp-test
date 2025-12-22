import React, { useState, useEffect, ChangeEvent } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title text displayed at the top */
  title?: string;
  /** The subtitle or description text */
  subtitle?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** Label text for the input field */
  inputLabel?: string;
  /** Default greeting message when no name is entered */
  defaultGreeting?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple interactive component that displays a greeting based on user input.
 * Features a text input field that dynamically updates the greeting message.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld 
 *   title="Welcome!"
 *   subtitle="Enter your name to get started"
 *   inputPlaceholder="Type your name..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title = 'Hello World',
  subtitle = 'Welcome to our interactive greeting page',
  inputPlaceholder = 'Enter your name...',
  inputLabel = 'Your Name',
  defaultGreeting = 'Hello! Please enter your name above.',
  className = '',
}) => {
  const [name, setName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handles input change events
   * @param event - The change event from the input field
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  /**
   * Generates the greeting message based on current name
   * @returns The formatted greeting string
   */
  const getGreeting = (): string => {
    if (name.trim() === '') {
      return defaultGreeting;
    }
    return `Hello, ${name.trim()}!`;
  };

  const greetingEmpty = name.trim() === '';

  return (
    <main 
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`}
      role="main"
      aria-label="Hello World main content"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__title">{title}</h1>
        
        {subtitle && (
          <p className="hello-world__subtitle">{subtitle}</p>
        )}

        <div className="hello-world__input-group">
          <label 
            htmlFor="name-input" 
            className="hello-world__label"
          >
            {inputLabel}
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            placeholder={inputPlaceholder}
            value={name}
            onChange={handleInputChange}
            aria-label={inputLabel}
            aria-describedby="greeting-output"
          />
        </div>

        <div 
          id="greeting-output"
          className={`hello-world__greeting ${greetingEmpty ? 'hello-world__greeting--empty' : ''}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {getGreeting()}
        </div>
      </div>
    </main>
  );
};