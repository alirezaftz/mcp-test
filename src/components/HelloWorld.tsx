import React, { useState, useEffect } from 'react';
import './HelloWorld.css';

/**
 * Props interface for the HelloWorld component
 */
export interface HelloWorldProps {
  /**
   * The main greeting message to display
   */
  message?: string;
  
  /**
   * Optional subheading text
   */
  subheading?: string;
  
  /**
   * Show animation on mount
   */
  animated?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HelloWorld Component
 * 
 * A simple, accessible greeting component that displays a welcome message
 * with optional animation and subheading.
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  message = 'Hello, World!',
  subheading = 'Welcome to our application',
  animated = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <section 
      className={`hello-world ${isVisible ? 'hello-world--visible' : ''} ${className}`}
      role="region"
      aria-label="Welcome section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__heading">
          {message}
        </h1>
        {subheading && (
          <p className="hello-world__subheading">
            {subheading}
          </p>
        )}
        <button 
          className="hello-world__button"
          aria-label="Get started with the application"
          onClick={() => {
            console.log('Get Started clicked');
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};