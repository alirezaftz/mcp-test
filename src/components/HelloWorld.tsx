import React, { useState } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Initial greeting message to display
   */
  initialGreeting?: string;
  /**
   * Placeholder text for the input field
   */
  inputPlaceholder?: string;
  /**
   * Title text to display
   */
  title?: string;
  /**
   * Description text to display below the title
   */
  description?: string;
  /**
   * Label for the input field
   */
  inputLabel?: string;
}

/**
 * HelloWorld component - A simple page with a title, description, and text input
 * 
 * This component displays a greeting page with an input field that allows users
 * to enter their name and see a personalized greeting message.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialGreeting = '',
  inputPlaceholder = 'Enter your name...',
  title = 'Hello World',
  description = 'Welcome! Please enter your name below to receive a personalized greeting.',
  inputLabel = 'Your Name'
}) => {
  const [name, setName] = useState<string>('');

  /**
   * Handles changes to the text input
   * @param event - Input change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  /**
   * Generates the greeting message based on the current name
   * @returns Greeting message string
   */
  const getGreeting = (): string => {
    if (name.trim()) {
      return `Hello, ${name.trim()}! Welcome to our page.`;
    }
    return initialGreeting;
  };

  return (
    <main className="hello-world">
      <section 
        className="hello-world__container" 
        role="region" 
        aria-label="Hello world main content"
      >
        <h1 className="hello-world__title">{title}</h1>
        
        <p className="hello-world__description">{description}</p>

        <div className="hello-world__input-group">
          <label htmlFor="name-input" className="hello-world__label">
            {inputLabel}
          </label>
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            placeholder={inputPlaceholder}
            value={name}
            onChange={handleInputChange}
            aria-label="Enter your name"
          />
        </div>

        {getGreeting() && (
          <div 
            className="hello-world__greeting" 
            role="status" 
            aria-live="polite"
            aria-label="Greeting message"
          >
            {getGreeting()}
          </div>
        )}
      </section>
    </main>
  );
};