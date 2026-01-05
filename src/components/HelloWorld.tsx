import React from 'react'

/**
 * Props interface for HelloWorld component
 */
export interface HelloWorldProps {
  /** Main greeting message to display */
  message: string
  /** Optional subtitle text */
  subtitle?: string
}

/**
 * HelloWorld component
 * Displays a greeting message with optional subtitle
 * 
 * @param props - Component props
 * @returns React component
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({ message, subtitle }) => {
  return (
    <section 
      className="hello-world" 
      role="region" 
      aria-label="Hello world greeting section"
    >
      <div className="hello-world__container">
        <h1 className="hello-world__heading">{message}</h1>
        {subtitle && (
          <p className="hello-world__subtitle">{subtitle}</p>
        )}
        <button 
          className="hello-world__button hello-world__button--primary"
          aria-label="Get started with the application"
          onClick={() => alert('Welcome! This is a simple hello world page.')}
        >
          Get Started
        </button>
      </div>
    </section>
  )
}