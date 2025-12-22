import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main title text displayed at the top */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Greeting prefix to display before the user's name */
  greeting?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * HelloWorld component
 * A simple page that displays a title, text input, and personalized greeting
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Type something...',
  greeting = 'Hello',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handles input field changes
   * @param event - React change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Clears the input field
   */
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <section 
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`}
      role="region"
      aria-label="Hello world section"
    >
      <div className="hello-world__content">
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
            aria-label="Name input field"
          />
        </div>

        {inputValue && (
          <div className="hello-world__greeting-container">
            <p className="hello-world__greeting">
              {greeting}, <span className="hello-world__greeting-name">{inputValue}</span>!
            </p>
            <button
              className="hello-world__clear-button"
              onClick={handleClear}
              aria-label="Clear input field"
            >
              Clear
            </button>
          </div>
        )}

        {!inputValue && (
          <p className="hello-world__hint">
            Type your name above to see a personalized greeting
          </p>
        )}
      </div>
    </section>
  );
};