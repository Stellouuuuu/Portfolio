import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { LangProvider } from './i18n';
import './styles.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);

// The built page is pre-rendered: attach to it. In `npm run dev` the root is empty and is rendered normally.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
