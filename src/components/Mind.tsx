import { mindItems } from '../data/content';
import { Reveal } from './Reveal';

export function Mind() {
  return (
    <section id="mind">
      <div className="wrap">
        <div className="mind-head">
          <div>
            <Reveal className="sh"><b>III</b><span className="line"></span>My mind · The trunk</Reveal>
            <Reveal as="h2" className="h2">What <em>feeds</em> my curiosity.</Reveal>
          </div>
          <Reveal as="p">
            My mind doesn’t live in a single discipline. These are the worlds I keep returning to, the ones that shape how I think, and what I choose to build.
          </Reveal>
        </div>
        <ul className="mind-list">
          {mindItems.map((item, index) => (
            <Reveal as="li" key={item.title}>
              <span className="i">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="ar">→</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
