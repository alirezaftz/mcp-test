import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component.
 */
export interface HelloWorldProps {
  /**
   * The main title text to display
   */
  title: string;
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string;
  
  /**
   * Label text for the input field
   */
  label?: string;
  
  /**
   * Optional CSS class name for styling customization
   */
  className?: string;
}

/**
 * HelloWorld component that displays a greeting and an input field.
 * 
 * This component demonstrates a simple interactive page with:
 * - A welcoming headline
 * - A text input for user name entry
 * - Dynamic greeting display based on user input
 * 
 * Accessibility features:
 * - Semantic HTML with proper ARIA attributes
 * - Labeled input field for screen readers
 * - Keyboard accessible
 * 
 * @param {HelloWorldProps} props - Component props
 * @returns {JSX.Element} The HelloWorld component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  placeholder = 'Enter text...',
  label = 'Input',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input change events and updates state.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <section 
      className={`hello-world ${className}`.trim()} 
      role="region" 
      aria-label="Hello world page section"
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{title}</h1>
        </header>

        <div className="hello-world__content">
          <div className="hello-world__input-group">
            <label 
              htmlFor="hello-world-input" 
              className="hello-world__label"
            >
              {label}
            </label>
            <input
              id="hello-world-input"
              type="text"
              className="hello-world__input"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label={`${label} text input field`}
              aria-describedby="hello-world-description"
            />
            <p 
              id="hello-world-description" 
              className="hello-world__description"
            >
              Type your name to see a personalized greeting
            </p>
          </div>

          {inputValue && (
            <div 
              className="hello-world__greeting" 
              role="status" 
              aria-live="polite"
            >
              <p className="hello-world__greeting-text">
                Hello, <strong className="hello-world__greeting-name">{inputValue}</strong>!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};