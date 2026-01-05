import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Default text to display */
  defaultText?: string;
  /** Placeholder text for the input field */
  placeholderText?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional ARIA label for the section */
  ariaLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting text and provides
 * an input field for users to customize the message.
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  defaultText = 'Hello World',
  placeholderText = 'Enter text here...',
  className = '',
  ariaLabel = 'Hello world section'
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>(defaultText);

  /**
   * Handles input change events
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputText(value);
    setDisplayText(value || defaultText);
  };

  /**
   * Handles form submission
   * @param event - React form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setDisplayText(inputText || defaultText);
  };

  /**
   * Resets the display text to default
   */
  const handleReset = (): void => {
    setInputText('');
    setDisplayText(defaultText);
  };

  return (
    <section 
      className={`hello-world ${className}`.trim()} 
      role="region" 
      aria-label={ariaLabel}
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{displayText}</h1>
        </header>

        <form 
          className="hello-world__form" 
          onSubmit={handleSubmit}
          aria-label="Text input form"
        >
          <div className="hello-world__input-group">
            <label 
              htmlFor="hello-world-input" 
              className="hello-world__label"
            >
              Enter your message:
            </label>
            <input
              id="hello-world-input"
              type="text"
              className="hello-world__input"
              value={inputText}
              onChange={handleInputChange}
              placeholder={placeholderText}
              aria-label="Text input field"
              aria-describedby="input-description"
            />
            <span 
              id="input-description" 
              className="hello-world__description"
            >
              Type a custom message to replace the default text
            </span>
          </div>

          <div className="hello-world__actions">
            <button
              type="submit"
              className="hello-world__button hello-world__button--primary"
              aria-label="Submit text input"
            >
              Update
            </button>
            <button
              type="button"
              className="hello-world__button hello-world__button--secondary"
              onClick={handleReset}
              aria-label="Reset to default text"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};