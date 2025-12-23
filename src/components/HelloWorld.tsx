import React, { useState } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Initial greeting message */
  greeting?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** ARIA label for the main section */
  ariaLabel?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple hello world page with a text input that allows users to enter their name
 * and displays a personalized greeting message.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  greeting = 'Hello, World!',
  inputPlaceholder = 'Enter your name',
  ariaLabel = 'Hello World page section'
}) => {
  const [userName, setUserName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const displayGreeting = userName.trim() 
    ? `Hello, ${userName}!` 
    : greeting;

  return (
    <section 
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''}`}
      role="region" 
      aria-label={ariaLabel}
    >
      <div className="hello-world__container">
        <header className="hello-world__header">
          <h1 className="hello-world__title">{displayGreeting}</h1>
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
              value={userName}
              onChange={handleInputChange}
              aria-label="Name input field"
              aria-describedby="input-description"
            />
            <p 
              id="input-description" 
              className="hello-world__description"
            >
              Type your name to see a personalized greeting
            </p>
          </div>

          {userName.trim() && (
            <div className="hello-world__message" role="status" aria-live="polite">
              <p className="hello-world__greeting-text">
                Nice to meet you, {userName}! 👋
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default HelloWorld;';