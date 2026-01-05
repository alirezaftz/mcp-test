import React from 'react';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /** Main greeting text to display */
  greeting: string;
  /** Optional additional message to display below the greeting */
  message?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message to the user.
 * Follows semantic HTML and accessibility best practices.
 * 
 * @param props - Component props
 * @returns A section element containing the greeting
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ greeting, message }) => {
  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__heading">{greeting}</h1>
        {message && (
          <p className="hello-world__message">{message}</p>
        )}
        <button 
          className="hello-world__button hello-world__button--primary"
          aria-label="Get started with the application"
          onClick={() => {
            console.log('Get Started button clicked');
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};