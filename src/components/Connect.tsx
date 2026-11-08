import { useEffect, useRef, useState } from 'react';
import { contact } from '../data/content';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export function Connect() {
  const { t, lang } = useLang();
  const c = t.connect;
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let text = c.copied;
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      text = contact.email;
    }
    setMessage(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 2200);
  }

  const socials = [
    { label: 'LinkedIn', url: contact.linkedin },
    { label: 'GitHub', url: contact.github },
    { label: c.resume, url: lang === 'fr' ? contact.resumeFr : contact.resume },
  ].filter((item) => item.url !== '');

  return (
    <section className="connect" id="connect">
      <div className="wrap">
        <Reveal className="sh"><b>VIII</b><span className="line"></span>{c.head}</Reveal>
        <Reveal as="h2" className="h2">{c.h2a}<em>{c.h2em}</em></Reveal>
        <Reveal as="p" className="sub">{c.sub}</Reveal>
        <Reveal className="mail">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <button className="copy" onClick={copy}>{c.copy}</button>
        </Reveal>
        <Reveal as="p" className="small-caps school">
          {c.student}<a href={`mailto:${contact.schoolEmail}`}>{contact.schoolEmail}</a>
        </Reveal>
        <Reveal className="socials">
          {socials.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noopener">{item.label} <span>↗</span></a>
          ))}
        </Reveal>
      </div>
      <footer>
        <span className="sig">Stella Gbaguidi</span>
        <span>{c.made}</span>
        <a href="#hero" className="tlink">{c.back}</a>
      </footer>
      <div className={`toast${message ? ' show' : ''}`} role="status">{message ?? c.copied}</div>
    </section>
  );
}
