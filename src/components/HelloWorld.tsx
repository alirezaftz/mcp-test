import React, { useState } from 'react';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title text displayed at the top */
  title: string;
  /** Optional subtitle text displayed below the title */
  subtitle?: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * HelloWorld component - A simple page with greeting and text input
 * 
 * This component displays a hello world message with an interactive text input
 * that allows users to enter their name. The greeting updates dynamically
 * as the user types.
 * 
 * @param {HelloWorldProps} props - Component props
 * @returns {JSX.Element} Rendered HelloWorld component
 * 
 * @example
 * ```tsx
 * <HelloWorld
 *   title="Hello World"
 *   subtitle="Enter your name"
 *   placeholder="Type here..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  subtitle,
  placeholder = 'Enter text...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles changes to the text input
   * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Clears the input field
   */
  const handleClear = (): void => {
    setInputValue('');
  };

  return (
    <section
      className={`hello-world ${className}`.trim()}
      role="region"
      aria-label="Hello world page section"
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
              Your Name:
            </label>
            <input
              id="hello-input"
              type="text"
              className="hello-world__input"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Text input for your name"
            />
            {inputValue && (
              <button
                className="hello-world__clear-button"
                onClick={handleClear}
                aria-label="Clear input field"
                type="button"
              >
                Clear
              </button>
            )}
          </div>

          {inputValue && (
            <div
              className="hello-world__greeting"
              role="status"
              aria-live="polite"
            >
              <p className="hello-world__greeting-text">
                Hello, <strong className="hello-world__greeting-name">{inputValue}</strong>!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};