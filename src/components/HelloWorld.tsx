import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting text to display
   * @default "Hello, World!"
   */
  initialGreeting?: string;
  
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholderText?: string;
  
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting and allows users to
 * personalize it via a text input field.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld 
 *   initialGreeting="Welcome!"
 *   placeholderText="Your name"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  placeholderText = 'Enter your name...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input change events
   * Updates the greeting text based on user input
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setDisplayGreeting(`Hello, ${value}!`);
    } else {
      setDisplayGreeting(initialGreeting);
    }
  };

  /**
   * Handles form submission
   * Prevents default form behavior
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section 
      className={`hello-world ${className}`.trim()} 
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__heading">{displayGreeting}</h1>
        
        <form 
          className="hello-world__form" 
          onSubmit={handleSubmit}
          aria-label="Greeting customization form"
        >
          <label 
            htmlFor="name-input" 
            className="hello-world__label"
          >
            Personalize your greeting:
          </label>
          
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholderText}
            aria-label="Name input field"
            aria-describedby="input-description"
          />
          
          <span 
            id="input-description" 
            className="hello-world__description"
          >
            Type your name to see a personalized greeting
          </span>
        </form>
      </div>
    </section>
  );
};