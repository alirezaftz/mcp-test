import React, { useState } from 'react';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message
   * @default "Hello World!"
   */
  initialGreeting?: string;
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholder?: string;
}

/**
 * HelloWorld component
 * Displays a greeting message and allows users to customize it via text input
 * 
 * @example
 * ```tsx
 * <HelloWorld initialGreeting="Welcome!" placeholder="Type here..." />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello World!',
  placeholder = 'Enter your name...',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input field changes
   * @param event - React change event from input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  /**
   * Handles greeting update when button is clicked
   */
  const handleUpdateGreeting = (): void => {
    if (inputValue.trim()) {
      setGreeting(`Hello, ${inputValue}!`);
    } else {
      setGreeting(initialGreeting);
    }
  };

  /**
   * Handles Enter key press in input field
   * @param event - React keyboard event from input element
   */
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleUpdateGreeting();
    }
  };

  return (
    <section className="hello-world" role="region" aria-label="Hello World greeting section">
      <div className="hello-world__container">
        <h1 className="hello-world__title">{greeting}</h1>
        
        <div className="hello-world__input-group">
          <label htmlFor="name-input" className="hello-world__label">
            Customize your greeting:
          </label>
          
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            aria-label="Name input field"
          />
          
          <button
            className="hello-world__button"
            onClick={handleUpdateGreeting}
            aria-label="Update greeting message"
          >
            Update Greeting
          </button>
        </div>

        <p className="hello-world__hint">
          Type your name and click the button or press Enter
        </p>
      </div>
    </section>
  );
};