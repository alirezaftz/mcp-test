import React, { useState } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   * @default "Hello, World!"
   */
  initialMessage?: string;
  
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholderText?: string;
  
  /**
   * Additional CSS class name for custom styling
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message and allows users
 * to input their name, which updates the greeting dynamically.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialMessage = 'Hello, World!',
  placeholderText = 'Enter your name...',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(initialMessage);

  /**
   * Handles input change events and updates the greeting
   * @param event - Change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setGreeting(`Hello, ${value}!`);
    } else {
      setGreeting(initialMessage);
    }
  };

  return (
    <main className={`hello-world ${className}`.trim()}>
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello World greeting section"
      >
        <div className="hello-world__content">
          <h1 className="hello-world__title">{greeting}</h1>
          
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
              placeholder={placeholderText}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Name input field"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;