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
   * Label for the input field
   * @default "Your Name"
   */
  inputLabel?: string;
}

/**
 * HelloWorld component that displays a greeting and allows user to input text
 * 
 * This component demonstrates:
 * - Semantic HTML structure with proper ARIA attributes
 * - BEM naming convention for CSS classes
 * - Controlled input field with React state
 * - Accessible form elements
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name...',
  inputLabel = 'Your Name'
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input change events
   * @param event - React change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setDisplayGreeting(`Hello, ${value}!`);
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
    <main className="hello-world" role="main">
      <section 
        className="hello-world__content" 
        role="region" 
        aria-label="Hello world greeting section"
      >
        <div className="hello-world__header">
          <h1 className="hello-world__title">
            {displayGreeting}
          </h1>
        </div>

        <form 
          className="hello-world__form" 
          onSubmit={handleSubmit}
          aria-label="Name input form"
        >
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
              value={inputValue}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              aria-label={`${inputLabel} input field`}
              aria-describedby="input-description"
            />
            <span 
              id="input-description" 
              className="hello-world__input-description"
            >
              Type your name to personalize the greeting
            </span>
          </div>
        </form>
      </section>
    </main>
  );
};

export default HelloWorld;