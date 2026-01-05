import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title/heading text */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Initial value for the input field */
  initialValue?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * HelloWorld component that displays a greeting and text input
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Type something...',
  initialValue = '',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue('');
  };

  return (
    <section
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`}
      role="region"
      aria-label="Hello World section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__title">{title}</h1>
        
        <div className="hello-world__input-group">
          <label htmlFor="name-input" className="hello-world__label">
            Enter your name:
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-label="Text input field for name"
          />
        </div>

        {inputValue && (
          <div className="hello-world__greeting" role="status" aria-live="polite">
            <p className="hello-world__greeting-text">
              Hello, <strong className="hello-world__greeting-name">{inputValue}</strong>!
            </p>
          </div>
        )}

        {inputValue && (
          <button
            className="hello-world__clear-button"
            onClick={handleClearClick}
            aria-label="Clear input field"
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
};