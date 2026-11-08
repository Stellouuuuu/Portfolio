import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/content';
import { useLang } from '../i18n';
import { Links, Metrics } from './ProjectParts';

type Kind = 'overview' | 'story' | 'pictures' | 'code';

/** The story slide shows the first two pictures; any more get a slide of their own. */
const STORY_PICTURES = 2;

function slidesOf(project: Project): Kind[] {
  const extra = (project.sample?.gallery.length ?? 0) > STORY_PICTURES;
  return extra ? ['overview', 'story', 'pictures', 'code'] : ['overview', 'story', 'code'];
}

function Overview({ project }: { project: Project }) {
  return (
    <div className="sc-grid">
      <div className="sc-text pi">
        <div className="row">
          <span className="no">No. {project.no}</span>
          <span className={`status${project.bloom ? ' bloom' : ''}`}>{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="small-caps cat">{project.category}</p>
        <p className="desc">{project.description}</p>
        <Metrics project={project} />
        <p className="stack">{project.stack}</p>
        <Links project={project} />
      </div>
      <div className="sc-frame" style={{ ['--g' as string]: project.gradient }}>
        {project.shot ? <img src={project.shot.src} alt={project.shot.alt} decoding="async" /> : <span className="letter">{project.letter}</span>}
      </div>
    </div>
  );
}

function StorySlide({ project }: { project: Project }) {
  const gallery = (project.sample?.gallery ?? []).slice(0, STORY_PICTURES);
  return (
    <div className="sc-grid sc-story">
      <ol className="sc-steps">
        {project.story.map((step, index) => (
          <li key={step.label}>
            <span className="n">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <b>{step.label}</b>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={`sc-gallery n${gallery.length}`}>
        {gallery.map((figure) => (
          <figure key={figure.src}>
            <img src={figure.src} alt={figure.alt} decoding="async" />
            <figcaption>{figure.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function PicturesSlide({ project }: { project: Project }) {
  const gallery = (project.sample?.gallery ?? []).slice(STORY_PICTURES);
  return (
    <div className={`sc-wall n${gallery.length}`}>
      {gallery.map((figure) => (
        <figure key={figure.src}>
          <img src={figure.src} alt={figure.alt} decoding="async" />
          <figcaption>{figure.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function CodeSlide({ project }: { project: Project }) {
  const sample = project.sample;
  if (!sample) {
    return null;
  }
  return (
    <div className="sc-grid sc-code">
      <figure className="sc-card code">
        <div className="bar"><i></i><i></i><i></i><span>{sample.code.file}</span></div>
        <pre tabIndex={0}><code>{sample.code.code}</code></pre>
        <figcaption>{sample.code.caption}</figcaption>
      </figure>
      <figure className="sc-card term">
        <div className="bar"><i></i><i></i><i></i><span>terminal</span></div>
        <pre tabIndex={0}><code><span className="p">$ {sample.terminal.command}</span>{'\n'}{sample.terminal.output.join('\n')}</code></pre>
        <figcaption>{sample.terminal.caption}</figcaption>
      </figure>
    </div>
  );
}

/**
 * The featured projects as horizontal slides. On a wide screen the section stays pinned while the page
 * scroll moves the slides sideways; on a narrow screen, or with reduced motion, they simply stack.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const outer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = projects.flatMap((project) => slidesOf(project).map((kind) => ({ project, kind })));
  const count = slides.length;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const element = outer.current;
      if (!element) {
        return;
      }
      const range = element.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -element.getBoundingClientRect().top / range)) : 0;
      element.style.setProperty('--p', progress.toFixed(4));
      setActive(Math.min(count - 1, Math.round(progress * (count - 1))));
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  const labels: Record<Kind, string> = { overview: t.build.slideOverview, story: t.build.slideStory, pictures: t.build.slidePictures, code: t.build.slideCode };
  const current = slides[active]?.project;
  const currentKind = slides[active]?.kind ?? 'overview';

  return (
    <div
      className="showcase"
      ref={outer}
      style={{ ['--n' as string]: count, ['--shift' as string]: ((count - 1) / count) * 100 }}
    >
      <div className="sc-sticky">
        <div className="sc-hud" aria-hidden="true">
          <span>{current?.no ?? ''} / {String(projects.length).padStart(2, '0')}</span>
          <span>{current?.title}</span>
          <span>{labels[currentKind]}</span>
        </div>
        <div className="sc-track">
          {slides.map(({ project, kind }) => (
            <section key={`${project.title}-${kind}`} className="sc-panel" aria-label={`${project.title}, ${labels[kind]}`}>
              {kind === 'overview' ? <Overview project={project} /> : kind === 'story' ? <StorySlide project={project} /> : kind === 'pictures' ? <PicturesSlide project={project} /> : <CodeSlide project={project} />}
            </section>
          ))}
        </div>
        <div className="sc-progress" aria-hidden="true">
          <i></i>
          <span>{t.build.scrollHint} →</span>
        </div>
      </div>
    </div>
  );
}
