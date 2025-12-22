import React, { useState } from 'react';
import '../styles/HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Initial greeting text to display */
  initialGreeting?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** Label text for the input field */
  inputLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays "Hello World" heading and a text input field.
 * The input value is managed in component state and displayed back to the user.
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello World',
  inputPlaceholder = 'Enter your name...',
  inputLabel = 'Your Name',
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input change events
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello World greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__heading">{initialGreeting}</h1>
        
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
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={inputLabel}
          />
        </div>

        {inputValue && (
          <p className="hello-world__output" role="status" aria-live="polite">
            Hello, <span className="hello-world__output-name">{inputValue}</span>!
          </p>
        )}
      </div>
    </section>
  );
};