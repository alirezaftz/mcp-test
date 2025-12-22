import React, { useState } from 'react';
import '../styles/HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   * @default "Hello, World!"
   */
  initialGreeting?: string;
  
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  inputPlaceholder?: string;
  
  /**
   * ARIA label for the main section
   * @default "Hello World section"
   */
  ariaLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message and a text input field.
 * When the user types in the input, the greeting message updates in real-time.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld 
 *   initialGreeting="Welcome!"
 *   inputPlaceholder="Type here..."
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name...',
  ariaLabel = 'Hello World section'
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Trigger animation on mount
  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Handle input change events
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Generate the greeting message based on input value
   * @returns The greeting message string
   */
  const getGreeting = (): string => {
    if (inputValue.trim()) {
      return `Hello, ${inputValue}!`;
    }
    return initialGreeting;
  };

  return (
    <section 
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''}`}
      role="region" 
      aria-label={ariaLabel}
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title" role="heading" aria-level={1}>
            {getGreeting()}
          </h1>
        </header>

        <main className="hello-world__content">
          <div className="hello-world__input-group">
            <label 
              htmlFor="name-input" 
              className="hello-world__label"
            >
              What's your name?
            </label>
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Name input field"
              aria-describedby="input-description"
            />
            <span 
              id="input-description" 
              className="hello-world__description"
            >
              Type your name to personalize the greeting
            </span>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HelloWorld;';