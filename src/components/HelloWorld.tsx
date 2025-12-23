import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** Initial greeting message */
  greeting?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** Custom CSS class name for the component root */
  className?: string;
  /** ARIA label for the main section */
  ariaLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple greeting page with an interactive text input field.
 * Displays a greeting message and allows users to enter their name.
 * 
 * @param props - Component props
 * @returns React functional component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name',
  className = '',
  ariaLabel = 'Hello World section'
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handles input change events
   * @param event - React change event
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
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="hello-world__content">
        <h1 className="hello-world__heading">{greeting}</h1>
        
        <form 
          className="hello-world__form"
          onSubmit={handleSubmit}
          role="form"
          aria-label="Name input form"
        >
          <div className="hello-world__input-wrapper">
            <label 
              htmlFor="name-input"
              className="hello-world__label"
            >
              Your Name:
            </label>
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Text input for name"
            />
          </div>
          
          {inputValue && (
            <p className="hello-world__greeting-message">
              Hello, {inputValue}!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default HelloWorld;