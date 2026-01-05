import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { App } from '../App'

describe('App Component', () => {
  test('should render without crashing', () => {
    render(<App />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
  })

  test('should render HelloWorld component', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /hello world/i })
    expect(heading).toBeInTheDocument()
  })

  test('should have proper main element with app class', () => {
    render(<App />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('app')
  })

  test('should render with subtitle text', () => {
    render(<App />)
    const subtitle = screen.getByText(/welcome to your first react/i)
    expect(subtitle).toBeInTheDocument()
  })
})