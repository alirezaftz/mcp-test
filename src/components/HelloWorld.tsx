import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   */
  greeting?: string;
  /**
   * Placeholder text for the input field
   */
  placeholder?: string;
  /**
   * Label text for the input field
   */
  inputLabel?: string;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message and allows users to enter their name
 * in a text input field. The greeting updates dynamically as the user types.
 * 
 * @param props - Component properties
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello, World!',
  placeholder = 'Enter your name',
  inputLabel = 'Your Name',
  className = '',
}) => {
  const [name, setName] = useState<string>('');

  /**
   * Handle input change event
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  /**
   * Generate personalized greeting message
   * @returns Greeting string with name if provided, otherwise default greeting
   */
  const getGreeting = (): string => {
    return name.trim() ? `Hello, ${name}!` : greeting;
  };

  return (
    <section
      className={`hello-world ${className}`.trim()}
      role="region"
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__heading">{getGreeting()}</h1>
        
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
            placeholder={placeholder}
            value={name}
            onChange={handleInputChange}
            aria-label={inputLabel}
            aria-describedby="name-input-description"
          />
          <span
            id="name-input-description"
            className="hello-world__description"
          >
            Type your name to see a personalized greeting
          </span>
        </div>
      </div>
    </section>
  );
};

export default HelloWorld;