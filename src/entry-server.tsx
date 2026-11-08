import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

/** The page as HTML, so crawlers, link previews and visitors without JavaScript get the content. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
