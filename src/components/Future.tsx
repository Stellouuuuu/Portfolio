import { futureColumns, path } from '../data/content';
import { Reveal } from './Reveal';

export function Future() {
  return (
    <section className="future" id="future">
      <div className="wrap">
        <Reveal className="sh"><b>VI</b><span className="line"></span>The future · The bloom</Reveal>
        <Reveal as="p" className="big-quote">I’m not just building a career. I’m building a <em>vision.</em></Reveal>
        <Reveal className="path">
          {path.map((node) => (
            <div key={node.title} className={`node ${node.state}`}>
              <span className="dot"></span>
              <h5>{node.title}</h5>
              <small>{node.caption}</small>
            </div>
          ))}
        </Reveal>
        <div className="cols">
          {futureColumns.map((column, index) => (
            <Reveal key={column.label} delay={index === 0 ? undefined : `${index * 0.1}s`}>
              <b>{column.label}</b>
              <p>{column.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
