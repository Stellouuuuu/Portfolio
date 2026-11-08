import { useEffect, useState } from 'react';
import { contact, type SectionId } from '../data/content';
import { useLang } from '../i18n';

const ids = ['about', 'mind', 'experience', 'build', 'beyond', 'future', 'connect'] as const satisfies readonly SectionId[];

export function Nav({ scrolled, active }: { scrolled: boolean; active: SectionId }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const other = lang === 'en' ? 'fr' : 'en';
  const cv = lang === 'fr' ? contact.resumeFr : contact.resume;

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a className="skip" href="#about">{t.skip}</a>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`} id="nav">
        <a href="#hero" className="mono" aria-label={t.home} onClick={() => setOpen(false)}>
          <i>S</i>Stella G.
        </a>
        <ul id="menu">
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : undefined} onClick={() => setOpen(false)}>{t.nav[id]}</a>
            </li>
          ))}
          <li className="cv-item">
            <a href={cv} target="_blank" rel="noopener" aria-label={t.cvLabel}>{t.cv}</a>
          </li>
        </ul>
        <div className="nav-tools">
          <a className="cv-btn" href={cv} target="_blank" rel="noopener" aria-label={t.cvLabel}>{t.cv}</a>
          <button className="lang" onClick={() => setLang(other)} aria-label={t.switchTo} lang={other}>
            <span className={lang === 'en' ? 'on' : undefined}>EN</span>
            <span className="sep">/</span>
            <span className={lang === 'fr' ? 'on' : undefined}>FR</span>
          </button>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
}
