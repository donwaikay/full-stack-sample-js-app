import type { Title } from '../types';

export default function VideoPlayer({ title, onClose }: { title: Title; onClose: () => void }) {
  return (
    <div className="player-overlay" role="dialog" aria-label={`Playing ${title.name}`}>
      <button className="player-close" onClick={onClose} aria-label="Close player">
        ✕
      </button>
      <video className="player-video" src={title.videoUrl} controls autoPlay playsInline />
      <div className="player-title">{title.name}</div>
    </div>
  );
}
