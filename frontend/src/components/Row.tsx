import TitleCard from './TitleCard';
import type { Title } from '../types';

export default function Row({
  label,
  titles,
  myListIds,
  onOpen,
  onToggleList,
}: {
  label: string;
  titles: Title[];
  myListIds: Set<number>;
  onOpen: (title: Title) => void;
  onToggleList: (title: Title) => void;
}) {
  if (titles.length === 0) return null;
  return (
    <section className="row">
      <h2 className="row-label">{label}</h2>
      <div className="row-track">
        {titles.map((t) => (
          <TitleCard key={t.id} title={t} inMyList={myListIds.has(t.id)} onOpen={onOpen} onToggleList={onToggleList} />
        ))}
      </div>
    </section>
  );
}
