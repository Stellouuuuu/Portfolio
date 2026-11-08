import { railLabels, sections, type SectionId } from '../data/content';

/** The growth rail on the left: where you are on the way from seed to petals. */
export function Rail({ active, progress }: { active: SectionId; progress: number }) {
  const current = sections.indexOf(active);
  return (
    <aside className="rail" aria-hidden="true">
      <ol>
        <i className="fill" style={{ height: `calc(${progress.toFixed(1)}% - 12px)` }} />
        {sections.map((id, index) => (
          <li key={id} className={index === current ? 'active' : index < current ? 'past' : undefined}>
            {railLabels[id]}
          </li>
        ))}
      </ol>
    </aside>
  );
}
