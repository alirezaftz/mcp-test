import React, { useState } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** The main title text to display */
  title: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Accessible label for the input field */
  inputLabel: string;
}

/**
 * HelloWorld component that displays a greeting and accepts text input
 * 
 * @param {HelloWorldProps} props - Component properties
 * @returns {JSX.Element} The HelloWorld component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Type something...',
  inputLabel
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input value changes
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello World section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__title">{title}</h1>
        
        <div className="hello-world__input-container">
          <label 
            htmlFor="hello-input" 
            className="hello-world__label"
          >
            {inputLabel}
          </label>
          <input
            id="hello-input"
            type="text"
            className="hello-world__input"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={inputLabel}
          />
        </div>

        {inputValue && (
          <p className="hello-world__greeting" role="status" aria-live="polite">
            Hello, {inputValue}!
          </p>
        )}
      </div>
    </section>
  );
};