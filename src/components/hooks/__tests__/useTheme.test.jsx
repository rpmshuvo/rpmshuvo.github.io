import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

test('defaults to dark and toggles to light', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  act(() => result.current.toggle());
  expect(result.current.theme).toBe('light');
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.getItem('theme')).toBe('light');
});
