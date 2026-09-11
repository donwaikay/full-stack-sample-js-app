import Poster from './Poster';
import type { Title } from '../types';

export default function DetailModal({
  title,
  inMyList,
  onClose,
  onPlay,
  onToggleList,
}: {
  title: Title;
  inMyList: boolean;
  onClose: () => void;
  onPlay: () => void;
  onToggleList: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <Poster title={title} className="modal-poster" />
        <div className="modal-body">
          <h2>{title.name}</h2>
          <p className="hero-meta">
            <span className="match">{title.match}% Match</span>
            <span>{title.year}</span>
            <span className="badge">{title.maturity}</span>
            <span>{title.durationMinutes}m</span>
          </p>
          <p className="modal-synopsis">{title.synopsis}</p>
          <p className="modal-genres">{title.genres.join(' • ')}</p>
          <div className="hero-actions">
            <button className="btn btn-light" onClick={onPlay}>
              ▶ Play
            </button>
            <button className="btn btn-muted" onClick={onToggleList}>
              {inMyList ? '✓ In My List' : '+ My List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
