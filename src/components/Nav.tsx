import type { SectionId } from '../data/content';
import { useLang } from '../i18n';

const ids = ['about', 'mind', 'build', 'beyond', 'future', 'connect'] as const satisfies readonly SectionId[];

export function Nav({ scrolled, active }: { scrolled: boolean; active: SectionId }) {
  const { lang, setLang, t } = useLang();
  const other = lang === 'en' ? 'fr' : 'en';
  return (
    <>
      <a className="skip" href="#about">{t.skip}</a>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <a href="#hero" className="mono" aria-label={t.home}>
          <i>S</i>Stella G.
        </a>
        <ul>
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : undefined}>{t.nav[id]}</a>
            </li>
          ))}
          <li>
            <button className="lang" onClick={() => setLang(other)} aria-label={t.switchTo} lang={other}>
              <span className={lang === 'en' ? 'on' : undefined}>EN</span>
              <span className="sep">/</span>
              <span className={lang === 'fr' ? 'on' : undefined}>FR</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
