import { facts, portrait } from '../data/content';
import { Reveal } from './Reveal';

export function About() {
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
              <img className="portrait" src={portrait} alt="Portrait of Stella Gbaguidi" width={800} height={1040} loading="lazy" />
            ) : null}
            <figcaption>Stella Gbaguidi</figcaption>
          </figure>
          <div className="note small-caps"><span>Portrait</span><span>MMXXVI</span></div>
        </Reveal>
        <div className="about-text">
          <Reveal className="sh"><b>II</b><span className="line"></span>Who am I · The roots</Reveal>
          <Reveal as="h2" className="h2">A curious mind, <em>rooted</em> in building.</Reveal>
          <Reveal as="p" className="lead">
            I’m Stella, a computer science student who believes code is one of the most elegant ways to turn an idea into something real.
          </Reveal>
          <Reveal as="p" className="body">
            I’m drawn to software engineering for its rigor, and to artificial intelligence for its possibilities. But what truly moves me is the moment a problem becomes a product: understanding what people need, designing the right solution, and building it until it works, beautifully.
          </Reveal>
          <Reveal as="p" className="body">
            Beyond the screen, I’m an entrepreneur at heart. I like to experiment, to start things, and to build with the ambition of creating something that lasts.
          </Reveal>
          <Reveal as="dl" className="facts">
            {facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
