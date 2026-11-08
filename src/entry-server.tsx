import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { LangProvider } from './i18n';

/** The page as HTML, so crawlers, link previews and visitors without JavaScript get the content. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </StrictMode>,
  );
}
