import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function Mind() {
  const { t, content } = useLang();
  return (
    <section id="mind">
      <div className="wrap">
        <div className="mind-head">
          <div>
            <Reveal className="sh"><b>III</b><span className="line"></span>{t.mind.head}</Reveal>
            <Reveal as="h2" className="h2">{t.mind.h2a}<em>{t.mind.h2em}</em>{t.mind.h2z}</Reveal>
          </div>
          <Reveal as="p">
            {t.mind.intro}
          </Reveal>
        </div>
        <ul className="mind-list">
          {content.mindItems.map((item, index) => (
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
