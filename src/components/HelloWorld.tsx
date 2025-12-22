import React, { useState } from 'react';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting text to display
   * @default "Hello, World!"
   */
  greeting?: string;
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  inputPlaceholder?: string;
  /**
   * Label for the text input
   * @default "Your Name:"
   */
  inputLabel?: string;
  /**
   * Additional CSS class names for the component
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple hello world page component with a text input field.
 * Displays a greeting message and allows users to input their name,
 * which updates the greeting dynamically.
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   greeting="Welcome!"
 *   inputPlaceholder="Type your name"
 *   inputLabel="Name:"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name...',
  inputLabel = 'Your Name:',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  /**
   * Handles input change events
   * @param event - The change event from the input field
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Handles form submission
   * @param event - The form submit event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setDisplayName(inputValue);
  };

  /**
   * Gets the current greeting message based on user input
   * @returns The personalized greeting or default greeting
   */
  const getGreeting = (): string => {
    if (displayName.trim()) {
      return `Hello, ${displayName}!`;
    }
    return greeting;
  };

  return (
    <main className={`hello-world ${className}`.trim()}>
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__content">
          <h1 className="hello-world__heading">{getGreeting()}</h1>
          
          <form 
            className="hello-world__form" 
            onSubmit={handleSubmit}
            aria-label="Name input form"
          >
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
                value={inputValue}
                onChange={handleInputChange}
                placeholder={inputPlaceholder}
                aria-label="Name input field"
                aria-describedby="name-input-description"
              />
              <span 
                id="name-input-description" 
                className="hello-world__input-description"
              >
                Enter your name to personalize the greeting
              </span>
            </div>
            
            <button 
              type="submit" 
              className="hello-world__button"
              aria-label="Submit name to update greeting"
            >
              Greet Me
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;