import { useMemo, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';
import DetailModal from '../components/DetailModal';
import VideoPlayer from '../components/VideoPlayer';
import { useCatalog } from '../hooks/useCatalog';
import { useMyList } from '../hooks/useMyList';
import type { Title, User } from '../types';

export default function Browse({ user }: { user: User }) {
  const { data, isLoading } = useCatalog();
  const { titleIds: myListIds, toggle } = useMyList(user);
  const [activeTitle, setActiveTitle] = useState<Title | null>(null);
  const [playing, setPlaying] = useState<Title | null>(null);

  const byId = useMemo(() => {
    const map = new Map<number, Title>();
    data?.catalog.forEach((t) => map.set(t.id, t));
    return map;
  }, [data]);

  const featured = data ? byId.get(data.featuredId) : undefined;
  const myListTitles = data?.catalog.filter((t) => myListIds.has(t.id)) ?? [];

  if (isLoading || !data) return <div className="loading-screen">Loading…</div>;

  return (
    <div className="browse">
      {featured && (
        <HeroBanner title={featured} onPlay={() => setPlaying(featured)} onMoreInfo={() => setActiveTitle(featured)} />
      )}

      <div className="rows">
        {myListTitles.length > 0 && (
          <Row
            label="My List"
            titles={myListTitles}
            myListIds={myListIds}
            onOpen={setActiveTitle}
            onToggleList={(t) => toggle(t.id)}
          />
        )}
        {data.rows.map((row) => (
          <Row
            key={row.label}
            label={row.label}
            titles={row.titleIds.map((id) => byId.get(id)).filter((t): t is Title => !!t)}
            myListIds={myListIds}
            onOpen={setActiveTitle}
            onToggleList={(t) => toggle(t.id)}
          />
        ))}
      </div>

      {activeTitle && (
        <DetailModal
          title={activeTitle}
          inMyList={myListIds.has(activeTitle.id)}
          onClose={() => setActiveTitle(null)}
          onPlay={() => {
            setPlaying(activeTitle);
            setActiveTitle(null);
          }}
          onToggleList={() => toggle(activeTitle.id)}
        />
      )}

      {playing && <VideoPlayer title={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
