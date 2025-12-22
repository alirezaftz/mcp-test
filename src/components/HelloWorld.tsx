import React, { useState } from 'react';

/**
 * Props for the HelloWorld component
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
  placeholder?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple greeting page with a text input that allows users to customize
 * the greeting message by entering their name.
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   initialGreeting="Welcome" 
 *   placeholder="Type your name here"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = 'Hello, World!',
  placeholder = 'Enter your name...',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(initialGreeting);

  /**
   * Handles input change events
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setGreeting(`Hello, ${value}!`);
    } else {
      setGreeting(initialGreeting);
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <main className={`hello-world ${className}`.trim()}>
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello World greeting section"
      >
        <header className="hello-world__header">
          <h1 className="hello-world__title">{greeting}</h1>
        </header>

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
              Your Name:
            </label>
            <input
              id="name-input"
              type="text"
              className="hello-world__input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              aria-label="Name input field"
              aria-describedby="name-input-description"
            />
            <span 
              id="name-input-description" 
              className="hello-world__description"
            >
              Type your name to personalize the greeting
            </span>
          </div>
        </form>

        <footer className="hello-world__footer">
          <p className="hello-world__info">
            {inputValue ? `Nice to meet you, ${inputValue}!` : 'Enter your name above'}
          </p>
        </footer>
      </section>
    </main>
  );
};