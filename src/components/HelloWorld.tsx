import React, { useState } from 'react';
import '../styles/HelloWorld.css';

/**
 * Props for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message
   * @default "Hello, World!"
   */
  initialMessage?: string;
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholder?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple page that displays a greeting message and allows users
 * to enter their name in a text input field. The greeting updates
 * dynamically based on the input value.
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   initialMessage="Welcome!" 
 *   placeholder="Type your name here"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialMessage = 'Hello, World!',
  placeholder = 'Enter your name...',
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input change events
   * @param event - The change event from the input field
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Generates the display message based on input value
   * @returns The greeting message to display
   */
  const getDisplayMessage = (): string => {
    if (inputValue.trim()) {
      return `Hello, ${inputValue}!`;
    }
    return initialMessage;
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello World greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__heading">
          {getDisplayMessage()}
        </h1>
        
        <div className="hello-world__input-wrapper">
          <label 
            htmlFor="name-input" 
            className="hello-world__label"
          >
            Enter your name:
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-label="Name input field"
            aria-describedby="input-description"
          />
          <p 
            id="input-description" 
            className="hello-world__description"
          >
            Type your name to personalize the greeting
          </p>
        </div>
      </div>
    </section>
  );
};