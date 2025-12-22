import React, { useState } from 'react';

/**
 * HelloWorld component - A simple page displaying hello world message
 * with an interactive text input field.
 * 
 * @component
 * @example
 * ```tsx
 * <HelloWorld />
 * ```
 */
export const HelloWorld: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles input change events
   * @param event - The change event from the input element
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <main className="hello-world" role="main">
      <section className="hello-world__container" role="region" aria-label="Hello world content section">
        <div className="hello-world__content">
          <h1 className="hello-world__heading">Hello World</h1>
          
          <div className="hello-world__input-wrapper">
            <label htmlFor="user-input" className="hello-world__label">
              Enter your message:
            </label>
            <input
              id="user-input"
              type="text"
              className="hello-world__input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type something..."
              aria-label="Text input field for user message"
            />
          </div>

          {inputValue && (
            <div className="hello-world__output" role="status" aria-live="polite">
              <p className="hello-world__output-text">
                You entered: <strong className="hello-world__output-value">{inputValue}</strong>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};