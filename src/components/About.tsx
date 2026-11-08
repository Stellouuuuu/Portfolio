import { portrait } from '../data/content';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function About() {
  const { t, content } = useLang();
  const a = t.about;
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-sticky">
          <figure className="arch">
            <div className="ph">
              <svg viewBox="0 0 100 120" fill="none" stroke="#6B5446" strokeWidth=".8">
                <circle cx="50" cy="38" r="17" />
                <path d="M18 118c2-30 15-46 32-46s30 16 32 46" />
              </svg>
            </div>
            {portrait ? (
              <img className="portrait" src={portrait} alt={a.portraitAlt} width={800} height={1040} loading="lazy" />
            ) : null}
            <figcaption>Stella Gbaguidi</figcaption>
          </figure>
          <div className="note small-caps"><span>{a.portrait}</span><span>MMXXVI</span></div>
        </Reveal>
        <div className="about-text">
          <Reveal className="sh"><b>II</b><span className="line"></span>{a.head}</Reveal>
          <Reveal as="h2" className="h2">{a.h2a}<em>{a.h2em}</em>{a.h2z}</Reveal>
          <Reveal as="p" className="lead">
            {a.lead}
          </Reveal>
          <Reveal as="p" className="body">
            {a.body1}
          </Reveal>
          <Reveal as="p" className="body">
            {a.body2}
          </Reveal>
          <Reveal as="dl" className="facts">
            {content.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
