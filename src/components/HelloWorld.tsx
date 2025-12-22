import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   * @default "Hello, World!"
   */
  greeting?: string;
  
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
}

/**
 * HelloWorld Component
 * 
 * A simple hello world page component that displays a greeting message
 * and includes a text input field for user interaction.
 * 
 * Features:
 * - Dynamic greeting that updates based on user input
 * - Accessible form with proper ARIA labels
 * - Semantic HTML structure
 * - BEM CSS class naming convention
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   greeting="Welcome!" 
 *   placeholder="Type here..."
 *   inputLabel="Name"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = "Hello, World!",
  placeholder = "Enter your name...",
  inputLabel = "Your Name"
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(greeting);

  /**
   * Handles input change and updates the greeting message
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setDisplayGreeting(`Hello, ${value}!`);
    } else {
      setDisplayGreeting(greeting);
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="hello-world" role="main">
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__content">
          <h1 className="hello-world__heading" aria-live="polite">
            {displayGreeting}
          </h1>
          
          <form 
            className="hello-world__form" 
            onSubmit={handleSubmit}
            aria-label="Greeting input form"
          >
            <div className="hello-world__form-group">
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
                placeholder={placeholder}
                aria-label={`${inputLabel} input field`}
                aria-describedby="input-description"
              />
              
              <p 
                id="input-description" 
                className="hello-world__description"
              >
                Type your name to personalize the greeting
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;