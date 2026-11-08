import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function Beyond() {
  const { t } = useLang();
  const b = t.beyond;
  return (
    <section id="beyond">
      <div className="wrap">
        <div className="beyond-head">
          <Reveal className="sh"><b>V</b><span className="line"></span>{b.head}</Reveal>
          <Reveal as="h2" className="h2">{b.h2a}<em>{b.h2em}</em></Reveal>
          <Reveal as="p">{b.intro}</Reveal>
        </div>
        <div className="mood">
          <Reveal className="tile t1">
            <span className="tag-s">{b.t1[0]}</span>
            <h4>{b.t1[1]}</h4>
            <p>{b.t1[2]}</p>
          </Reveal>
          <Reveal className="tile t2" delay=".1s">
            <blockquote>{b.quote}</blockquote>
          </Reveal>
          <Reveal className="tile t3" delay=".15s">
            <span className="tag-s">{b.t3[0]}</span>
            <h4>{b.t3[1]}</h4>
            <p>{b.t3[2]}</p>
          </Reveal>
          <Reveal className="tile t4" delay=".2s">
            <span className="tag-s">{b.t4[0]}</span>
            <h4>{b.t4[1]}</h4>
            <ul>
              {b.t4[2].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="tile t5">
            <div>
              <span className="small-caps">{b.t5[0]}</span>
              <h4>{b.t5[1]}</h4>
            </div>
            <p>{b.t5[2]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
