import React from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main greeting message to display */
  message: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional callback when the greeting button is clicked */
  onGreetingClick?: () => void;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a greeting message with optional subtitle
 * and interactive button for accessibility demonstration.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  message, 
  subtitle,
  onGreetingClick 
}) => {
  const [clickCount, setClickCount] = React.useState<number>(0);

  const handleClick = (): void => {
    setClickCount(prevCount => prevCount + 1);
    if (onGreetingClick) {
      onGreetingClick();
    }
  };

  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello world greeting section"
      data-testid="hello-world-section"
    >
      <div className="hello-world__content">
        <h1 
          className="hello-world__heading" 
          data-testid="hello-world-heading"
        >
          {message}
        </h1>
        
        {subtitle && (
          <p 
            className="hello-world__subtitle" 
            data-testid="hello-world-subtitle"
          >
            {subtitle}
          </p>
        )}

        <button
          className="hello-world__button"
          aria-label="Click to increment greeting counter"
          onClick={handleClick}
          data-testid="hello-world-button"
        >
          Say Hello!
        </button>

        {clickCount > 0 && (
          <p 
            className="hello-world__counter" 
            data-testid="hello-world-counter"
            aria-live="polite"
          >
            You&apos;ve said hello {clickCount} {clickCount === 1 ? 'time' : 'times'}!
          </p>
        )}
      </div>
    </section>
  );
};