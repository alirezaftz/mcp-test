import React, { useState } from 'react';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * The main title text to display
   * @default "Hello World"
   */
  title?: string;

  /**
   * Description text below the title
   * @default "Welcome! Enter your name below to receive a personalized greeting."
   */
  description?: string;

  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholder?: string;

  /**
   * Label text for the input field
   * @default "Your Name"
   */
  inputLabel?: string;

  /**
   * Custom greeting prefix
   * @default "Hello"
   */
  greetingPrefix?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple interactive component that displays a greeting message
 * based on user input in a text field.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld
 *   title="Hello World"
 *   description="Enter your name"
 *   placeholder="Your name..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title = 'Hello World',
  description = 'Welcome! Enter your name below to receive a personalized greeting.',
  placeholder = 'Enter your name...',
  inputLabel = 'Your Name',
  greetingPrefix = 'Hello',
}) => {
  const [name, setName] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<boolean>(false);

  /**
   * Handles input change and triggers greeting display
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setDisplayGreeting(value.trim().length > 0);
  };

  return (
    <main className="hello-world" role="main" aria-label="Hello World main section">
      <div className="hello-world__container">
        <h1 className="hello-world__title">{title}</h1>
        
        <p className="hello-world__description">{description}</p>
        
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
            aria-label="Name input field"
            aria-describedby="greeting-output"
          />
        </div>

        <div 
          id="greeting-output"
          className={`hello-world__greeting ${displayGreeting ? 'hello-world__greeting--visible' : ''}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {displayGreeting && `${greetingPrefix}, ${name}!`}
        </div>
      </div>
    </main>
  );
};

export default HelloWorld;