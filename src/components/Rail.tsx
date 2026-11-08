import { sections, type SectionId } from '../data/content';
import { useLang } from '../i18n';

/** The growth rail on the left: where you are on the way from seed to petals. */
export function Rail({ active, progress }: { active: SectionId; progress: number }) {
  const { t } = useLang();
  const current = sections.indexOf(active);
  return (
    <aside className="rail" aria-hidden="true">
      <ol>
        <i className="fill" style={{ height: `calc(${progress.toFixed(1)}% - 12px)` }} />
        {sections.map((id, index) => (
          <li key={id} className={index === current ? 'active' : index < current ? 'past' : undefined}>
            {t.rail[id]}
          </li>
        ))}
      </ol>
    </aside>
  );
}
