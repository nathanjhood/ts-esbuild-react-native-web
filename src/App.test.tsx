import * as React from 'react';
// import { test, expect, describe } from '@jest/globals';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

const timeout = 10000;

afterEach(() => {
  cleanup();
}, timeout);


describe('App', () => {
  it(
    'renders successfully',
    () => {
      render(<App />);
      const linkElement = screen.getByText(/Welcome to React Native/i);
      expect(linkElement).toBeDefined();
    },
    timeout
  );
});
