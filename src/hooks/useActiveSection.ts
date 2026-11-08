import { useEffect, useState } from 'react';
import { sections, type SectionId } from '../data/content';

/** The section that is crossing the middle of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const id of sections) {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
