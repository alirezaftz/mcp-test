import React, { useState } from 'react';

/**
 * Props for the HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title text to display */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Label text for the input field */
  label?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * HelloWorld component displays a greeting and an interactive text input
 * 
 * This component demonstrates a simple form with controlled input and
 * follows WCAG 2.2 accessibility guidelines with proper ARIA attributes
 * and semantic HTML.
 * 
 * @param props - Component props
 * @returns A section containing a greeting and text input
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Type here...',
  label = 'Your input',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input value changes
   * @param event - React change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Handles form submission
   * @param event - React form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <section
      className={`hello-world ${className}`.trim()}
      role="region"
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__title">{title}</h1>
        
        <form
          className="hello-world__form"
          onSubmit={handleSubmit}
          aria-label="Greeting input form"
        >
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
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              aria-label={label}
              aria-describedby="greeting-output"
            />
          </div>
          
          {inputValue && (
            <p
              id="greeting-output"
              className="hello-world__greeting"
              role="status"
              aria-live="polite"
            >
              Hello, {inputValue}!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};