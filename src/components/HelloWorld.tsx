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
  initialMessage?: string;
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  inputPlaceholder?: string;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * HelloWorld component - A simple page with greeting and text input
 * 
 * Features:
 * - Displays a customizable greeting message
 * - Text input that updates the greeting in real-time
 * - Accessible with proper ARIA attributes
 * - Follows BEM naming convention
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialMessage = 'Hello, World!',
  inputPlaceholder = 'Enter your name...',
  className = ''
}) => {
  const [name, setName] = useState<string>('');

  /**
   * Handle input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  /**
   * Generate greeting message based on current input
   */
  const getGreeting = (): string => {
    if (name.trim()) {
      return `Hello, ${name}!`;
    }
    return initialMessage;
  };

  return (
    <section 
      className={`hello-world ${className}`.trim()} 
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">Welcome</h1>
        </header>

        <div className="hello-world__content">
          <p 
            className="hello-world__greeting" 
            role="status" 
            aria-live="polite"
            aria-atomic="true"
          >
            {getGreeting()}
          </p>

          <div className="hello-world__input-group">
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
              placeholder={inputPlaceholder}
              value={name}
              onChange={handleInputChange}
              aria-label="Enter your name to personalize greeting"
              aria-describedby="greeting-description"
            />
            <p 
              id="greeting-description" 
              className="hello-world__description"
            >
              Type your name to see a personalized greeting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};