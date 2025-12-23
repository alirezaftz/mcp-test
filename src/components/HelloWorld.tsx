import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title displayed at the top */
  title: string;
  /** Subtitle text displayed below the title */
  subtitle?: string;
  /** Placeholder text for the input field */
  placeholderText?: string;
  /** Prefix for the greeting message (e.g., "Hello") */
  greetingPrefix?: string;
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * HelloWorld component - A simple greeting page with text input
 * 
 * This component displays a greeting message that updates based on user input.
 * It features semantic HTML, ARIA attributes for accessibility, and BEM class naming.
 * 
 * @param props - Component props including title, subtitle, and input configuration
 * @returns A section element containing the hello world interface
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  subtitle,
  placeholderText = 'Enter text',
  greetingPrefix = 'Hello',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handles input change events
   * @param event - React change event from the input field
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Handles input clear button click
   */
  const handleClearInput = (): void => {
    setInputValue('');
  };

  const displayGreeting = inputValue.trim() 
    ? `${greetingPrefix}, ${inputValue.trim()}!` 
    : `${greetingPrefix}, World!`;

  return (
    <section
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`.trim()}
      role="region"
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{title}</h1>
          {subtitle && (
            <p className="hello-world__subtitle">{subtitle}</p>
          )}
        </header>

        <div className="hello-world__content">
          <div className="hello-world__greeting-display" aria-live="polite" aria-atomic="true">
            <p className="hello-world__greeting-text">{displayGreeting}</p>
          </div>

          <div className="hello-world__input-group">
            <label htmlFor="name-input" className="hello-world__label">
              Your Name
            </label>
            <div className="hello-world__input-wrapper">
              <input
                id="name-input"
                type="text"
                className="hello-world__input"
                placeholder={placeholderText}
                value={inputValue}
                onChange={handleInputChange}
                aria-label="Name input field"
                aria-describedby="input-description"
              />
              {inputValue && (
                <button
                  className="hello-world__clear-button"
                  onClick={handleClearInput}
                  aria-label="Clear input field"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
            <p id="input-description" className="hello-world__input-description">
              Type your name to personalize the greeting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};