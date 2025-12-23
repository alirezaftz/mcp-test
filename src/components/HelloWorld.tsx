import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title displayed at the top of the component */
  title: string;
  /** Optional subtitle text displayed below the title */
  subtitle?: string;
  /** Label text for the input field */
  inputLabel: string;
  /** Placeholder text shown inside the input field */
  inputPlaceholder?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple page component that displays a greeting with a text input field.
 * Users can enter their name and see a personalized greeting message.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld
 *   title="Hello World"
 *   subtitle="Welcome to our app"
 *   inputLabel="Enter your name"
 *   inputPlaceholder="Type here..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  subtitle,
  inputLabel,
  inputPlaceholder = '',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input field changes
   * @param event - The input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Clears the input field value
   */
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <section
      className={`hello-world ${className}`.trim()}
      role="region"
      aria-label="Hello World page section"
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{title}</h1>
          {subtitle && (
            <p className="hello-world__subtitle">{subtitle}</p>
          )}
        </header>

        <div className="hello-world__content">
          <div className="hello-world__input-group">
            <label
              htmlFor="hello-input"
              className="hello-world__label"
            >
              {inputLabel}
            </label>
            <input
              id="hello-input"
              type="text"
              className="hello-world__input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              aria-label={inputLabel}
              aria-describedby="hello-input-description"
            />
            <span
              id="hello-input-description"
              className="hello-world__description"
            >
              Type your name to see a personalized greeting
            </span>
          </div>

          {inputValue && (
            <div
              className="hello-world__greeting"
              role="status"
              aria-live="polite"
            >
              <p className="hello-world__greeting-text">
                Hello, <strong>{inputValue}</strong>! Nice to meet you! 👋
              </p>
              <button
                type="button"
                className="hello-world__clear-button"
                onClick={handleClear}
                aria-label="Clear input field"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};