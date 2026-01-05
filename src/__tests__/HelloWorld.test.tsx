import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HelloWorld } from '../components/HelloWorld'

describe('HelloWorld Component', () => {
  describe('Rendering', () => {
    test('should render with message prop', () => {
      render(<HelloWorld message="Test Message" />)
      const heading = screen.getByRole('heading', { name: /test message/i })
      expect(heading).toBeInTheDocument()
    })

    test('should render with subtitle when provided', () => {
      render(<HelloWorld message="Hello" subtitle="This is a subtitle" />)
      const subtitle = screen.getByText(/this is a subtitle/i)
      expect(subtitle).toBeInTheDocument()
    })

    test('should not render subtitle when not provided', () => {
      render(<HelloWorld message="Hello" />)
      const paragraphs = screen.queryAllByRole('paragraph')
      expect(paragraphs.length).toBe(0)
    })

    test('should render Get Started button', () => {
      render(<HelloWorld message="Hello" />)
      const button = screen.getByRole('button', { name: /get started with the application/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have semantic section element with role region', () => {
      render(<HelloWorld message="Hello" />)
      const section = screen.getByRole('region', { name: /hello world greeting section/i })
      expect(section).toBeInTheDocument()
    })

    test('should have proper aria-label on section', () => {
      render(<HelloWorld message="Hello" />)
      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('aria-label', 'Hello world greeting section')
    })

    test('should have proper aria-label on button', () => {
      render(<HelloWorld message="Hello" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Get started with the application')
    })
  })

  describe('BEM Class Naming', () => {
    test('should use BEM naming convention for container', () => {
      const { container } = render(<HelloWorld message="Hello" />)
      const divElement = container.querySelector('.hello-world__container')
      expect(divElement).toBeInTheDocument()
    })

    test('should use BEM naming convention for heading', () => {
      const { container } = render(<HelloWorld message="Hello" />)
      const headingElement = container.querySelector('.hello-world__heading')
      expect(headingElement).toBeInTheDocument()
    })

    test('should use BEM naming convention for subtitle', () => {
      const { container } = render(<HelloWorld message="Hello" subtitle="Test" />)
      const subtitleElement = container.querySelector('.hello-world__subtitle')
      expect(subtitleElement).toBeInTheDocument()
    })

    test('should use BEM naming convention with modifier for button', () => {
      const { container } = render(<HelloWorld message="Hello" />)
      const buttonElement = container.querySelector('.hello-world__button--primary')
      expect(buttonElement).toBeInTheDocument()
    })

    test('should have base button class along with modifier', () => {
      render(<HelloWorld message="Hello" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hello-world__button')
      expect(button).toHaveClass('hello-world__button--primary')
    })
  })

  describe('Interactivity', () => {
    test('should handle button click', () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
      render(<HelloWorld message="Hello" />)
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      
      expect(alertMock).toHaveBeenCalledWith('Welcome! This is a simple hello world page.')
      alertMock.mockRestore()
    })

    test('should have button text "Get Started"', () => {
      render(<HelloWorld message="Hello" />)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Get Started')
    })
  })

  describe('Props Validation', () => {
    test('should accept and display custom message', () => {
      const customMessage = 'Custom Greeting'
      render(<HelloWorld message={customMessage} />)
      const heading = screen.getByRole('heading')
      expect(heading).toHaveTextContent(customMessage)
    })

    test('should accept and display custom subtitle', () => {
      const customSubtitle = 'Custom subtitle text'
      render(<HelloWorld message="Hello" subtitle={customSubtitle} />)
      const subtitle = screen.getByText(customSubtitle)
      expect(subtitle).toBeInTheDocument()
    })

    test('should handle empty subtitle gracefully', () => {
      render(<HelloWorld message="Hello" subtitle="" />)
      const paragraphs = screen.queryAllByRole('paragraph')
      expect(paragraphs.length).toBe(0)
    })
  })
})