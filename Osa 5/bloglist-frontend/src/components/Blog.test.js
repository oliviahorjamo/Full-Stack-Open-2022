// test for Blog component

// test that the title and author rendered by default but url not

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

let USER = {
  name: 'Olivia',
  username: 'olivia'
}

test('renders title', () => {
  const blog = {
    title: 'Testing is best',
    author: 'Tina Tester',
    url: 'www.google.com',
    user: USER
  }

  render(<Blog blog={blog} user={USER}>
  </Blog>)

  const title = screen.getByText(
    'Testing is best', { exact: false }
  )

  expect(title).toBeDefined()
})

test('renders author', () => {
  const blog = {
    title: 'Testing is best',
    author: 'Tina Tester',
    url: 'www.google.com',
    user: USER
  }

  render(<Blog blog={blog} user={USER}>
  </Blog>)

  const author = screen.getByText(
    'Tina Tester', { exact: false }
  )

  expect(author).toBeDefined()
})


test('url not rendered initially', () => {

  const blog = {
    title: 'Testing is best',
    author: 'Tina Tester',
    url: 'www.google.com',
    user: USER
  }

  render(<Blog blog={blog} user={USER}>
  </Blog>)

  const url = screen.queryByText('www.google.com')
  expect(url).toBeNull()
})