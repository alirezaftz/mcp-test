import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Title text to display */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Default value for the input field */
  defaultValue?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional ARIA label for the section */
  ariaLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting and a text input field.
 * Features:
 * - Displays a customizable title
 * - Text input with placeholder
 * - Shows personalized greeting based on input
 * - Fade-in animation on mount
 * - Fully accessible with ARIA attributes
 * 
 * @example
 * ```tsx
 * <HelloWorld
 *   title="Hello World"
 *   placeholder="Enter your name"
 *   defaultValue=""
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Type here...',
  defaultValue = '',
  className = '',
  ariaLabel = 'Hello World section'
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handles input change events
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Generates greeting message based on input value
   * @returns Personalized greeting or default message
   */
  const getGreeting = (): string => {
    if (inputValue.trim()) {
      return `Hello, ${inputValue}!`;
    }
    return 'Hello, World!';
  };

  return (
    <section
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="hello-world__content">
        <h1 className="hello-world__title">{title}</h1>
        
        <div className="hello-world__greeting" aria-live="polite">
          {getGreeting()}
        </div>

        <div className="hello-world__input-wrapper">
          <label htmlFor="name-input" className="hello-world__label">
            Your Name:
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label="Name input field"
            aria-describedby="greeting-description"
          />
          <span id="greeting-description" className="hello-world__description">
            Enter your name to see a personalized greeting
          </span>
        </div>
      </div>
    </section>
  );
};