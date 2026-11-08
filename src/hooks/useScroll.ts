import { useEffect, useState } from 'react';

/** How far the page is scrolled: a flag once it has moved, and the 0 to 100 progress. */
export function useScroll() {
  const [state, setState] = useState({ scrolled: false, progress: 0 });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        scrolled: window.scrollY > 40,
        progress: max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0,
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return state;
}
