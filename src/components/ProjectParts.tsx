import type { Project } from '../data/content';

export function Metrics({ project }: { project: Project }) {
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

export function Links({ project }: { project: Project }) {
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
