import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

test('App renders key sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Mehedi Hasan Shuvo/i })).toBeInTheDocument();
  expect(screen.getByText(/Where I've worked/i)).toBeInTheDocument();
  expect(screen.getByText(/Let's talk/i)).toBeInTheDocument();
});
