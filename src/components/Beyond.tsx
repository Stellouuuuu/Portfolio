import { Reveal } from './Reveal';

export function Beyond() {
  return (
    <section id="beyond">
      <div className="wrap">
        <div className="beyond-head">
          <Reveal className="sh"><b>V</b><span className="line"></span>Beyond code · The leaves</Reveal>
          <Reveal as="h2" className="h2">More than <em>a developer.</em></Reveal>
          <Reveal as="p">The ideas, the initiatives and the taste that shape the way I build.</Reveal>
        </div>
        <div className="mood">
          <Reveal className="tile t1">
            <span className="tag-s">01 · Entrepreneurship</span>
            <h4>Starting things.</h4>
            <p>Learning by building, testing ideas in the real world, and turning them into projects that create value.</p>
          </Reveal>
          <Reveal className="tile t2" delay=".1s">
            <blockquote>I like things that are built well: code, ideas, and lives.</blockquote>
          </Reveal>
          <Reveal className="tile t3" delay=".15s">
            <span className="tag-s">02 · Creativity</span>
            <h4>The details.</h4>
            <p>Design, aesthetics, and the care nobody asks for.</p>
          </Reveal>
          <Reveal className="tile t4" delay=".2s">
            <span className="tag-s">03 · Currently</span>
            <h4>On my desk</h4>
            <ul>
              <li>Mnemo: vision, next</li>
              <li>AegisAI: code analysis</li>
              <li>A local model that resists injection</li>
            </ul>
          </Reveal>
          <Reveal className="tile t5">
            <div>
              <span className="small-caps">04 · Habit</span>
              <h4>Writing down what failed</h4>
            </div>
            <p>Every project keeps a journal of what did not work and what I learned from it. The failures are the useful part.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
