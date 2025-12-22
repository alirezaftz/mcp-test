import React, { useState } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * The initial greeting text to display
   * @default "Hello World"
   */
  greeting?: string;
  
  /**
   * Placeholder text for the input field
   * @default "Enter your name"
   */
  placeholder?: string;
  
  /**
   * Label text for the input field
   * @default "Name"
   */
  label?: string;
}

/**
 * HelloWorld component - A simple greeting page with text input
 * 
 * This component displays a greeting message and allows users to enter
 * their name in a text input field. The greeting updates dynamically
 * as the user types.
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello World',
  placeholder = 'Enter your name',
  label = 'Name'
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handle input change events
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <main className="hello-world">
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__content">
          <h1 className="hello-world__title">
            {inputValue ? `${greeting}, ${inputValue}!` : greeting}
          </h1>
          
          <div className="hello-world__input-group">
            <label 
              htmlFor="name-input" 
              className="hello-world__label"
            >
              {label}
            </label>
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label={`${label} input field`}
              aria-describedby="input-description"
            />
            <span 
              id="input-description" 
              className="hello-world__description"
            >
              Enter your name to personalize the greeting
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};