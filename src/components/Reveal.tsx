import { createElement, type CSSProperties, type ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  as?: 'div' | 'p' | 'h2' | 'article' | 'ul' | 'li' | 'dl';
  className?: string;
  /** Stagger, as a CSS time such as ".1s". */
  delay?: string;
  children: ReactNode;
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as = 'div', className = '', delay, children }: RevealProps) {
  const { ref, shown } = useReveal<HTMLElement>();
  const style = delay ? ({ '--d': delay } as CSSProperties) : undefined;
  return createElement(as, { ref, style, className: `reveal${shown ? ' in' : ''} ${className}`.trim() }, children);
}
