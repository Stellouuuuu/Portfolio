import { useState } from 'react';
import { projects, type Project } from '../data/content';
import { Reveal } from './Reveal';

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const id = `story-${project.title.toLowerCase().replace(/\s+/g, '-')}`;

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
        <p className="stack">{project.stack}</p>
        <button className="story-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
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
        {project.links.length > 0 ? (
          <div className="links">
            {project.links.map((link) => (
              <a key={link.url} className="tlink" href={link.url} target="_blank" rel="noopener">{link.label} ↗</a>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export function Build() {
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
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
