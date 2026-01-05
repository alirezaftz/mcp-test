import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main message to display */
  message: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple component that displays a hello world message with animation
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  message, 
  subtitle,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const componentClass = `hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`.trim();

  return (
    <section 
      className={componentClass}
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__content">
        <h1 className="hello-world__heading" role="heading" aria-level={1}>
          {message}
        </h1>
        {subtitle && (
          <p className="hello-world__subtitle">
            {subtitle}
          </p>
        )}
        <button 
          className="hello-world__button"
          aria-label="Get started with the application"
          onClick={() => alert('Welcome! This is your Hello World page.')}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};