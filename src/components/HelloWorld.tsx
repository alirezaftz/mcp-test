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
   * Additional CSS class names to apply to the component
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple greeting page with a text input that allows users to personalize
 * their greeting message. Demonstrates basic React state management and
 * accessible form controls.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld 
 *   greeting="Welcome!" 
 *   placeholder="Type here..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello, World!',
  placeholder = 'Enter your name...',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(greeting);

  /**
   * Handles input change events and updates the greeting message
   * @param event - React change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
   * @param event - React form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <main className={`hello-world ${className}`.trim()}>
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__content">
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
              placeholder={placeholder}
              aria-label="Name input field"
              aria-describedby="input-description"
            />
            
            <p 
              id="input-description" 
              className="hello-world__description"
            >
              Type your name to see a personalized greeting
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;