import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title Foco', () => {
  render(<App />);
  const title = screen.getByText(/Foco/i);
  expect(title).toBeInTheDocument();
});
