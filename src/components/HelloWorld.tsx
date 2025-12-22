import React, { useState } from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * Title text to display at the top of the page
   */
  title?: string;
  
  /**
   * Description text below the title
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
   * Optional custom greeting prefix (default: "Hello, ")
   */
  greetingPrefix?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple hello world page with a text input that displays a personalized greeting
 * based on user input. Demonstrates accessible form controls and semantic HTML.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title = 'Hello World',
  description = 'Enter your name below to receive a personalized greeting!',
  placeholder = 'Enter your name...',
  inputLabel = 'Your Name',
  greetingPrefix = 'Hello, '
}) => {
  const [name, setName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const displayGreeting = name.trim() 
    ? `${greetingPrefix}${name.trim()}!` 
    : 'Your greeting will appear here';

  const greetingClassName = name.trim() 
    ? 'hello-world__greeting' 
    : 'hello-world__greeting hello-world__greeting--empty';

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
            id="name-input"
            type="text"
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
          className={greetingClassName}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {displayGreeting}
        </div>
      </div>
    </main>
  );
};