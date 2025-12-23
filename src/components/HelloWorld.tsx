import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** Initial greeting message to display */
  initialMessage?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message and allows users
 * to input their name to personalize the greeting.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  initialMessage = 'Hello, World!',
  inputPlaceholder = 'Enter your name'
}) => {
  const [userName, setUserName] = useState<string>('');
  const [displayMessage, setDisplayMessage] = useState<string>(initialMessage);

  /**
   * Handles input change event
   * @param event - React change event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setUserName(value);
    
    if (value.trim()) {
      setDisplayMessage(`Hello, ${value}!`);
    } else {
      setDisplayMessage(initialMessage);
    }
  };

  /**
   * Handles form submission
   * @param event - React form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <main className="hello-world" role="main" aria-label="Hello World application">
      <section className="hello-world__container" role="region" aria-label="Greeting section">
        <h1 className="hello-world__heading">{displayMessage}</h1>
        
        <form 
          className="hello-world__form" 
          onSubmit={handleSubmit}
          aria-label="Name input form"
        >
          <label htmlFor="name-input" className="hello-world__label">
            What's your name?
          </label>
          
          <input
            id="name-input"
            type="text"
            className="hello-world__input"
            placeholder={inputPlaceholder}
            value={userName}
            onChange={handleInputChange}
            aria-label="Name input field"
            aria-describedby="input-description"
          />
          
          <span id="input-description" className="hello-world__description">
            Type your name to see a personalized greeting
          </span>
        </form>
      </section>
    </main>
  );
};';