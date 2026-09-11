import Poster from './Poster';
import type { Title } from '../types';

export default function TitleCard({
  title,
  inMyList,
  onOpen,
  onToggleList,
}: {
  title: Title;
  inMyList: boolean;
  onOpen: (title: Title) => void;
  onToggleList: (title: Title) => void;
}) {
  return (
    <div className="title-card" onClick={() => onOpen(title)}>
      <Poster title={title} />
      <div className="title-card-overlay">
        <span className="title-card-name">{title.name}</span>
        <div className="title-card-row">
          <span className="match">{title.match}% Match</span>
          <button
            className="icon-button"
            title={inMyList ? 'Remove from My List' : 'Add to My List'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleList(title);
            }}
          >
            {inMyList ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
