import { renderHook } from '@testing-library/react';
import { useScrollSpy } from '../useScrollSpy.js';

test('returns first id by default', () => {
  const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']));
  expect(result.current).toBe('a');
});
