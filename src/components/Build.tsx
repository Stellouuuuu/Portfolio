import { useState } from 'react';
import { projects, type Project } from '../data/content';
import { Reveal } from './Reveal';

function storyId(project: Project): string {
  return `story-${project.title.toLowerCase().replace(/\s+/g, '-')}`;
}

function Metrics({ project }: { project: Project }) {
  return (
    <dl className="metrics">
      {project.metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.value}</dt>
          <dd>{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Story({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  const id = storyId(project);
  return (
    <>
      <button className="story-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        {open ? 'Close the story ' : 'Read the story '}<span className="pl">+</span>
      </button>
      <div id={id} className="steps">
        <div>
          <ol>
            {project.story.map((step) => (
              <li key={step.label}><b>{step.label}</b><span>{step.text}</span></li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

function Links({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return null;
  }
  return (
    <div className="links">
      {project.links.map((link) => (
        <a key={link.url} className="tlink" href={link.url} target="_blank" rel="noopener">{link.label} ↗</a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal as="article" className={`proj${open ? ' open' : ''}`}>
      <div className={`pv${project.shot ? ' has-shot' : ''}`} style={{ ['--g' as string]: project.gradient }}>
        <div className="frame"></div>
        <div className="letter">{project.letter}</div>
        {project.shot ? <img className="shot" src={project.shot.src} alt={project.shot.alt} loading="lazy" /> : null}
      </div>
      <div className="pi">
        <div className="row">
          <span className="no">No. {project.no}</span>
          <span className={`status${project.bloom ? ' bloom' : ''}`}>{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="small-caps cat">{project.category}</p>
        <p className="desc">{project.description}</p>
        <Metrics project={project} />
        <p className="stack">{project.stack}</p>
        <Story project={project} open={open} onToggle={() => setOpen((value) => !value)} />
        <Links project={project} />
      </div>
    </Reveal>
  );
}

/** A smaller entry for projects that have no screenshot or public code yet. */
function MoreRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal as="article" className={`more-row${open ? ' open' : ''}`}>
      <div className="more-main">
        <div className="row">
          <h3>{project.title}</h3>
          <span className={`status${project.bloom ? ' bloom' : ''}`}>{project.status}</span>
        </div>
        <p className="small-caps cat">{project.category}</p>
        <p className="desc">{project.description}</p>
        <p className="stack">{project.stack}</p>
      </div>
      <div className="more-side">
        <Metrics project={project} />
        <Story project={project} open={open} onToggle={() => setOpen((value) => !value)} />
        <Links project={project} />
      </div>
    </Reveal>
  );
}

export function Build() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);
  return (
    <section className="build" id="build">
      <div className="wrap">
        <div className="build-head">
          <div>
            <Reveal className="sh"><b>IV</b><span className="line"></span>What I build · The branches</Reveal>
            <Reveal as="h2" className="h2">Ideas, <em>grown</em> into systems.</Reveal>
          </div>
          <Reveal as="p">Every project starts with a question. Here is what I set out to solve, how I built it, and what it taught me.</Reveal>
        </div>
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
        {more.length > 0 ? (
          <div className="more">
            <Reveal className="sh more-title"><span className="line"></span>More work</Reveal>
            {more.map((project) => (
              <MoreRow key={project.title} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
