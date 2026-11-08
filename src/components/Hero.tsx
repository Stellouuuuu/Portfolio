import type { RefObject } from 'react';
import { useLang } from '../i18n';

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero({ treeRef }: { treeRef: RefObject<SVGSVGElement | null> }) {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <p className="eyebrow fadein" style={delay(0.1)}><b>I</b> {h.eyebrow}</p>
        <h1>
          <span className="ln"><span>Stella</span></span>
          <span className="ln"><span>Gbaguidi</span></span>
        </h1>
        <p className="tag fadein" style={delay(0.7)}>
          {h.tagA}<br />{h.tagB}<em>{h.tagEm}</em>
        </p>
        <p className="meta fadein" style={delay(0.9)}>
          {h.meta[0]}<b>·</b>{h.meta[1]}<b>·</b>{h.meta[2]}
        </p>
        <div className="hero-cta fadein" style={delay(1.1)}>
          <a href="#build" className="btn">{h.discover}</a>
          <a href="#connect" className="tlink">{h.connect}</a>
        </div>
      </div>
      <div className="tree-wrap">
        <svg
          ref={treeRef}
          id="tree"
          viewBox="-60 0 720 760"
          preserveAspectRatio="xMidYMax meet"
          aria-label={h.treeLabel}
        />
        <p className="tree-cap">{h.treeCaption}</p>
      </div>
      <div className="scroll-cue"><i></i>{h.scroll}</div>
    </section>
  );
}
