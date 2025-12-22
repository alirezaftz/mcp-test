import React, { useState } from 'react';
import './HelloWorld.css';

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
 * HelloWorld component - A simple greeting page with text input
 * 
 * Displays a greeting message and allows users to personalize it
 * by entering their name in a text input field.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld 
 *   initialMessage="Welcome!" 
 *   placeholder="Type your name" 
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  initialMessage = 'Hello, World!',
  placeholder = 'Enter your name...'
}) => {
  const [name, setName] = useState<string>('');

  /**
   * Handle input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  /**
   * Generate personalized greeting message
   */
  const getGreeting = (): string => {
    if (name.trim() === '') {
      return initialMessage;
    }
    return `Hello, ${name.trim()}!`;
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__title">
          {getGreeting()}
        </h1>
        
        <div className="hello-world__input-wrapper">
          <label 
            htmlFor="name-input" 
            className="hello-world__label"
          >
            Your Name:
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            value={name}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-label="Enter your name"
            aria-describedby="name-description"
          />
          <p 
            id="name-description" 
            className="hello-world__description"
          >
            Type your name to personalize the greeting
          </p>
        </div>
      </div>
    </section>
  );
};