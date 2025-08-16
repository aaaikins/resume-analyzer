import { render, screen } from '@testing-library/react';

test('renders configuration error when Clerk key is missing', () => {
  const origReactKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const origNextKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  delete process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  jest.isolateModules(() => {
    const App = require('./App').default;
    render(<App />);
    expect(screen.getByText(/Configuration Error/i)).toBeInTheDocument();
  });

  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY = origReactKey;
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = origNextKey;
});
