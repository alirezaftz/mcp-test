import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title to display */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Greeting text to show with the user's input */
  greeting?: string;
}

/**
 * HelloWorld component that displays a greeting and an input field
 * Users can type their name to see a personalized greeting
 * 
 * @param {HelloWorldProps} props - Component props
 * @returns {JSX.Element} The HelloWorld component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  title, 
  placeholder = 'Type here...', 
  greeting = 'Hello' 
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles changes to the input field
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
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
      <div className="hello-world__content">
        <h1 className="hello-world__title">{title}</h1>
        
        <div className="hello-world__input-container">
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
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-label="Name input field"
          />
        </div>

        {inputValue && (
          <p className="hello-world__greeting" role="status" aria-live="polite">
            {greeting}, {inputValue}!
          </p>
        )}
      </div>
    </section>
  );
};