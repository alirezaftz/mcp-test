import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   */
  initialGreeting?: string;
  /**
   * Placeholder text for the input field
   */
  inputPlaceholder?: string;
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * HelloWorld component - A simple page with a greeting and text input
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld
 *   initialGreeting="Hello, World!"
 *   inputPlaceholder="Enter your name..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  inputPlaceholder = 'Type something...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input change events
   * @param event - The change event from the input field
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setGreeting(`Hello, ${value}!`);
    } else {
      setGreeting(initialGreeting);
    }
  };

  return (
    <main className={`hello-world ${className}`.trim()}>
      <section
        className="hello-world__container"
        role="region"
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__content">
          <h1 className="hello-world__heading">{greeting}</h1>
          
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
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Name input field"
              aria-describedby="input-description"
            />
            <span
              id="input-description"
              className="hello-world__description"
            >
              Type your name to personalize the greeting
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;