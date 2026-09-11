import type { Title } from '../types';

export default function HeroBanner({
  title,
  onPlay,
  onMoreInfo,
}: {
  title: Title;
  onPlay: () => void;
  onMoreInfo: () => void;
}) {
  return (
    <section className="hero-banner" style={{ background: `radial-gradient(ellipse at 30% 20%, ${title.accent}44 0%, #0b0b0f 65%)` }}>
      <div className="hero-content">
        <span className="hero-eyebrow">Featured</span>
        <h1 className="hero-title">{title.name}</h1>
        <p className="hero-meta">
          <span className="match">{title.match}% Match</span>
          <span>{title.year}</span>
          <span className="badge">{title.maturity}</span>
          <span>{title.durationMinutes}m</span>
        </p>
        <p className="hero-synopsis">{title.synopsis}</p>
        <div className="hero-actions">
          <button className="btn btn-light" onClick={onPlay}>
            ▶ Play
          </button>
          <button className="btn btn-muted" onClick={onMoreInfo}>
            ⓘ More Info
          </button>
        </div>
      </div>
    </section>
  );
}
