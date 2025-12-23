import React, { useState, ChangeEvent } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * The main title displayed at the top of the component
   */
  title?: string;
  
  /**
   * Description text shown below the title
   */
  description?: string;
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string;
  
  /**
   * Label text for the input field
   */
  inputLabel?: string;
  
  /**
   * Default greeting message when input is empty
   */
  defaultGreeting?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple interactive component that displays a greeting message based on user input.
 * Features a text input field that dynamically updates a personalized greeting.
 * 
 * @param {HelloWorldProps} props - Component props
 * @returns {React.ReactElement} The rendered HelloWorld component
 * 
 * @example
 * ```tsx
 * <HelloWorld 
 *   title="Welcome!"
 *   description="Enter your name below"
 *   placeholder="Your name"
 * />
 * ```
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title = 'Hello World',
  description = 'Enter your name to receive a personalized greeting',
  placeholder = 'Enter your name...',
  inputLabel = 'Your Name',
  defaultGreeting = 'Enter your name above to see a greeting'
}) => {
  const [name, setName] = useState<string>('');

  /**
   * Handles input change events and updates the name state
   * 
   * @param {ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  /**
   * Generates the greeting message based on the current name value
   * 
   * @returns {string} The greeting message to display
   */
  const getGreeting = (): string => {
    if (name.trim()) {
      return `Hello, ${name.trim()}! Welcome to our page.`;
    }
    return defaultGreeting;
  };

  const greetingMessage = getGreeting();
  const isEmptyGreeting = !name.trim();

  return (
    <main className="hello-world" role="main">
      <div className="hello-world__container">
        <h1 className="hello-world__title">{title}</h1>
        
        <p className="hello-world__description">{description}</p>
        
        <div className="hello-world__input-group">
          <label 
            htmlFor="name-input" 
            className="hello-world__label"
          >
            {inputLabel}
          </label>
          
          <input
            type="text"
            id="name-input"
            className="hello-world__input"
            placeholder={placeholder}
            value={name}
            onChange={handleInputChange}
            aria-label="Enter your name for personalized greeting"
            aria-describedby="greeting-output"
          />
        </div>
        
        <div 
          id="greeting-output"
          className={`hello-world__greeting ${isEmptyGreeting ? 'hello-world__greeting--empty' : ''}`}
          role="status"
          aria-live="polite"
        >
          {greetingMessage}
        </div>
      </div>
    </main>
  );
};