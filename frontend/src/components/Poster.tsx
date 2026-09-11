import type { Title } from '../types';

export default function Poster({ title, className }: { title: Title; className?: string }) {
  const style = {
    background: `linear-gradient(160deg, ${title.accent}55 0%, #0b0b0f 70%)`,
  };
  return (
    <div className={`poster ${className ?? ''}`} style={style}>
      <span className="poster-genre">{title.genres[0]}</span>
      <span className="poster-name">{title.name}</span>
    </div>
  );
}
