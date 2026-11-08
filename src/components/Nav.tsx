import type { SectionId } from '../data/content';

const links: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'mind', label: 'Mind' },
  { id: 'build', label: 'Work' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'future', label: 'Future' },
  { id: 'connect', label: 'Contact' },
];

export function Nav({ scrolled, active }: { scrolled: boolean; active: SectionId }) {
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <a href="#hero" className="mono" aria-label="Stella Gbaguidi, back to the top">
          <i>S</i>Stella G.
        </a>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={active === link.id ? 'active' : undefined}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
