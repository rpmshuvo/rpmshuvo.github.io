import { render, screen } from '@testing-library/react';
import Button from '../Button.jsx';
import Badge from '../Badge.jsx';
import SocialLinks from '../SocialLinks.jsx';

test('Button renders anchor when href given', () => {
  render(<Button href="/x">Resume</Button>);
  const link = screen.getByText('Resume');
  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('href', '/x');
});

test('Badge renders children', () => {
  render(<Badge>Laravel</Badge>);
  expect(screen.getByText('Laravel')).toBeInTheDocument();
});

test('SocialLinks renders three labelled links', () => {
  render(<SocialLinks />);
  expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
});
