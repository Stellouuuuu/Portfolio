import type { RefObject } from 'react';

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero({ treeRef }: { treeRef: RefObject<SVGSVGElement | null> }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <p className="eyebrow fadein" style={delay(0.1)}><b>I</b> Welcome to my world</p>
        <h1>
          <span className="ln"><span>Stella</span></span>
          <span className="ln"><span>Gbaguidi</span></span>
        </h1>
        <p className="tag fadein" style={delay(0.7)}>
          I build things. I explore ideas.<br />I create <em>possibilities.</em>
        </p>
        <p className="meta fadein" style={delay(0.9)}>
          Student at Epitech<b>·</b>Software Engineering<b>·</b>Artificial Intelligence
        </p>
        <div className="hero-cta fadein" style={delay(1.1)}>
          <a href="#build" className="btn">Discover my work</a>
          <a href="#connect" className="tlink">Let’s connect</a>
        </div>
      </div>
      <div className="tree-wrap">
        <svg
          ref={treeRef}
          id="tree"
          viewBox="-60 0 720 760"
          preserveAspectRatio="xMidYMax meet"
          aria-label="A blossoming tree swaying in the wind"
        />
        <p className="tree-cap">move your cursor, feel the wind</p>
      </div>
      <div className="scroll-cue"><i></i>Scroll · watch it grow</div>
    </section>
  );
}
