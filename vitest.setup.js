import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia + IntersectionObserver; stub them for hooks/tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    // Treat prefers-reduced-motion: reduce as matching so animation hooks skip animation
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

class IO {
  constructor(cb) { this.cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || IO;
