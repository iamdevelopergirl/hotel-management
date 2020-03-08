import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import {
  toBeInTheDocument,
  toHaveClass,
} from '@testing-library/jest-dom'
import App from '../App.js';
import TestUtils from 'react-dom/test-utils';

it("should render login view", () => {
  render(<App/>);
  expect(container.firstChild.classList.contains('App')).toBe(true);
});

