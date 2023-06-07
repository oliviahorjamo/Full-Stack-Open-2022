import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test('renders a single todo', () => {
  const todo = {
    text: 'test this todo',
    done: false
  }

  render(<Todo todo={todo}/>)

  const element = screen.getByText('test this todo')
  expect(element).toBeDefined()
})