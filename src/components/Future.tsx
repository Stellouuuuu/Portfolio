import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function Future() {
  const { t, content } = useLang();
  const { futureColumns, path } = content;
  return (
    <section className="future" id="future">
      <div className="wrap">
        <Reveal className="sh"><b>VI</b><span className="line"></span>{t.future.head}</Reveal>
        <Reveal as="p" className="big-quote">{t.future.quoteA}<em>{t.future.quoteEm}</em></Reveal>
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
