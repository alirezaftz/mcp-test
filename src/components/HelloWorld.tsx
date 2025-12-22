import React, { useState } from 'react';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title text displayed at the top */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Greeting text prefix shown before the user's input */
  greeting?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a title, text input, and personalized greeting.
 * When the user types in the input, it displays a greeting with their input.
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   title="Hello World" 
 *   placeholder="Enter your name..." 
 *   greeting="Welcome"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  title, 
  placeholder = 'Type something...', 
  greeting = 'Hello' 
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input change events
   * @param event - Input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello world section with text input"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__title">{title}</h1>
        
        <div className="hello-world__input-group">
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
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label="Text input for name"
          />
        </div>

        {inputValue && (
          <div 
            className="hello-world__greeting" 
            role="status" 
            aria-live="polite"
          >
            <p className="hello-world__greeting-text">
              {greeting}, <span className="hello-world__greeting-name">{inputValue}</span>!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};