import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title text displayed at the top */
  title: string;
  /** Subtitle text displayed below the title */
  subtitle?: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Initial value for the input field */
  initialValue?: string;
  /** Additional CSS class names */
  className?: string;
  /** ARIA label for the section */
  ariaLabel?: string;
}

/**
 * HelloWorld component
 * Displays a greeting page with a text input field that shows the entered text
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld
 *   title="Hello World"
 *   subtitle="Welcome!"
 *   placeholder="Enter text..."
 *   initialValue=""
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  subtitle,
  placeholder = 'Type something...',
  initialValue = '',
  className = '',
  ariaLabel = 'Hello World section'
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  /**
   * Handles input field changes
   * @param event - React change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Clears the input field
   */
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <section
      className={`hello-world ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{title}</h1>
          {subtitle && (
            <p className="hello-world__subtitle">{subtitle}</p>
          )}
        </header>

        <div className="hello-world__content">
          <div className="hello-world__input-wrapper">
            <label
              htmlFor="hello-world-input"
              className="hello-world__label"
            >
              Enter your text:
            </label>
            <input
              id="hello-world-input"
              type="text"
              className="hello-world__input"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Text input field"
              aria-describedby="hello-world-output"
            />
            {inputValue && (
              <button
                className="hello-world__clear-button"
                onClick={handleClear}
                aria-label="Clear text input"
                type="button"
              >
                Clear
              </button>
            )}
          </div>

          <div
            id="hello-world-output"
            className="hello-world__output"
            role="status"
            aria-live="polite"
          >
            {inputValue ? (
              <>
                <p className="hello-world__output-label">You typed:</p>
                <p className="hello-world__output-text">{inputValue}</p>
              </>
            ) : (
              <p className="hello-world__output-placeholder">
                Start typing to see your text here...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};