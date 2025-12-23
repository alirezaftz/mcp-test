import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
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
  inputPlaceholder?: string;
  
  /**
   * Additional CSS class name for custom styling
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple hello world page component with a text input that allows users
 * to personalize the greeting message.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input change events
   * @param event - React change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setDisplayGreeting(`Hello, ${value.trim()}!`);
    } else {
      setDisplayGreeting(initialGreeting);
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
          <h1 className="hello-world__title">{displayGreeting}</h1>
          
          <form 
            className="hello-world__form" 
            onSubmit={handleSubmit}
            aria-label="Greeting customization form"
          >
            <label htmlFor="name-input" className="hello-world__label">
              Personalize your greeting:
            </label>
            
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              aria-label="Name input field for personalized greeting"
              aria-describedby="input-description"
            />
            
            <p id="input-description" className="hello-world__description">
              Type your name to see a personalized greeting
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};