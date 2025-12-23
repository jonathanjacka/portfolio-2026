import { useState, useEffect } from 'react';

/**
 * Hook that tracks the visual viewport height to detect mobile keyboard.
 * Returns the keyboard height (difference between window and visual viewport).
 */
export function useKeyboardHeight(): number {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateKeyboardHeight = () => {
      // The keyboard height is the difference between window height and visual viewport height
      const height = window.innerHeight - viewport.height;
      // Only set if significant (>50px) to avoid false positives from browser
      setKeyboardHeight(height > 50 ? height : 0);
    };

    viewport.addEventListener('resize', updateKeyboardHeight);
    viewport.addEventListener('scroll', updateKeyboardHeight);

    // Initial check
    updateKeyboardHeight();

    return () => {
      viewport.removeEventListener('resize', updateKeyboardHeight);
      viewport.removeEventListener('scroll', updateKeyboardHeight);
    };
  }, []);

  return keyboardHeight;
}
