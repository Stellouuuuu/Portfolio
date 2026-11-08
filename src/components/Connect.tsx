import { useEffect, useRef, useState } from 'react';
import { contact } from '../data/content';
import { Reveal } from './Reveal';

export function Connect() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let text = 'Email copied';
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
    { label: 'Résumé', url: contact.resume },
  ].filter((item) => item.url !== '');

  return (
    <section className="connect" id="connect">
      <div className="wrap">
        <Reveal className="sh"><b>VII</b><span className="line"></span>Let’s connect · The petals</Reveal>
        <Reveal as="h2" className="h2">Let’s build something <em>beyond the ordinary.</em></Reveal>
        <Reveal as="p" className="sub">Open to internships, research opportunities, collaborations and university admissions.</Reveal>
        <Reveal className="mail">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <button className="copy" onClick={copy}>Copy</button>
        </Reveal>
        <Reveal className="socials">
          {socials.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noopener">{item.label} <span>↗</span></a>
          ))}
        </Reveal>
      </div>
      <footer>
        <span className="sig">Stella Gbaguidi</span>
        <span>Designed &amp; built by Stella · MMXXVI</span>
        <a href="#hero" className="tlink">Back to the seed ↑</a>
      </footer>
      <div className={`toast${message ? ' show' : ''}`} role="status">{message ?? 'Email copied'}</div>
    </section>
  );
}
