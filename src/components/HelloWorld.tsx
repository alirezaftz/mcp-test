import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title text to display */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Text for the submit button */
  buttonText?: string;
}

/**
 * HelloWorld Component
 * A simple page with a title, text input, and greeting display
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Enter text...',
  buttonText = 'Submit'
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');

  /**
   * Handles input change events
   * @param event - Change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Handles form submission
   * @param event - Form submit event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputValue.trim()) {
      setGreeting(`Hello, ${inputValue}!`);
    } else {
      setGreeting('Hello, World!');
    }
  };

  return (
    <section
      className="hello-world"
      role="region"
      aria-label="Hello World page section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__title">{title}</h1>
        
        <form
          className="hello-world__form"
          onSubmit={handleSubmit}
          aria-label="Greeting form"
        >
          <div className="hello-world__input-group">
            <label htmlFor="name-input" className="hello-world__label">
              Your Name:
            </label>
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              aria-label="Name input field"
            />
          </div>
          
          <button
            type="submit"
            className="hello-world__button"
            aria-label="Submit greeting button"
          >
            {buttonText}
          </button>
        </form>

        {greeting && (
          <div
            className="hello-world__greeting"
            role="status"
            aria-live="polite"
          >
            {greeting}
          </div>
        )}
      </div>
    </section>
  );
};