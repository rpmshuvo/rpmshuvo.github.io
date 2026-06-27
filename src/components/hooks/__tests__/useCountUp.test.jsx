import { renderHook } from '@testing-library/react';
import { useCountUp } from '../useCountUp.js';
test('returns target immediately when not started', () => {
  const { result } = renderHook(() => useCountUp(5, false));
  expect(result.current).toBe(5); // reduced-motion stub in setup => jumps to target
});
