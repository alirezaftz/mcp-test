import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   * @default "Hello, World!"
   */
  greeting?: string;
  /**
   * Placeholder text for the input field
   * @default "Enter your name..."
   */
  placeholder?: string;
}

/**
 * HelloWorld component that displays a greeting and a text input
 * Users can enter their name to personalize the greeting
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = "Hello, World!",
  placeholder = "Enter your name..."
}) => {
  const [name, setName] = useState<string>('');
  const [displayGreeting, setDisplayGreeting] = useState<string>(greeting);

  /**
   * Handles input change events and updates the greeting
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setName(value);
    
    if (value.trim()) {
      setDisplayGreeting(`Hello, ${value}!`);
    } else {
      setDisplayGreeting(greeting);
    }
  };

  /**
   * Handles clearing the input when the clear button is clicked
   */
  const handleClear = (): void => {
    setName('');
    setDisplayGreeting(greeting);
  };

  return (
    <section className="hello-world" role="region" aria-label="Hello world greeting section">
      <div className="hello-world__container">
        <h1 className="hello-world__heading">{displayGreeting}</h1>
        
        <div className="hello-world__input-group">
          <label htmlFor="name-input" className="hello-world__label">
            What's your name?
          </label>
          <div className="hello-world__input-wrapper">
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              value={name}
              onChange={handleInputChange}
              placeholder={placeholder}
              aria-label="Name input field"
            />
            {name && (
              <button
                className="hello-world__clear-button"
                onClick={handleClear}
                aria-label="Clear name input"
                type="button"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <p className="hello-world__description">
          Type your name above to personalize the greeting!
        </p>
      </div>
    </section>
  );
};';