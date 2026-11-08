import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function Experience() {
  const { t, content } = useLang();
  const e = t.experience;
  return (
    <section id="experience">
      <div className="wrap">
        <div className="mind-head">
          <div>
            <Reveal className="sh"><b>IV</b><span className="line"></span>{e.head}</Reveal>
            <Reveal as="h2" className="h2">{e.h2a}<em>{e.h2em}</em></Reveal>
          </div>
          <Reveal as="p">{e.intro}</Reveal>
        </div>
        <ol className="xp-list">
          {content.experiences.map((item) => (
            <Reveal as="li" key={`${item.organisation}-${item.period}`} className="xp">
              <div className="xp-when">
                <span className="xp-period">{item.period}</span>
                <span className="xp-place">{item.place}</span>
              </div>
              <div className="xp-body">
                <h3>{item.title}</h3>
                <p className="xp-org">
                  {item.organisation}
                  <span> · {item.type}</span>
                </p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="stack">{item.stack}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
