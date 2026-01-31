import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Artifact, ArtifactStatus, ArtifactType } from './data/types';
import { artifacts as allArtifacts } from './data/artifacts';

type Theme = 'light' | 'dark';

const statusMeta: Record<ArtifactStatus, { label: string; color: string }> = {
  failed: { label: 'Failed', color: 'var(--fail)' },
  passed: { label: 'Passed', color: 'var(--pass)' },
  flaky: { label: 'Flaky', color: 'var(--flaky)' },
};

const typeMeta: Record<ArtifactType, string> = {
  screenshot: 'Screenshot',
  video: 'Video',
};

const formatDuration = (seconds: number) => `${seconds.toFixed(1)}s`;

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

function ArtifactCard({
  artifact,
  onOpen,
}: {
  artifact: Artifact;
  onOpen: (id: string) => void;
}) {
  const showVideoPill = artifact.hasVideo;
  return (
    <button className="artifact-card" onClick={() => onOpen(artifact.id)} aria-label={`Open ${artifact.title}`}>
      <div className="thumb">
        <img src={artifact.media.src} alt={`${artifact.title} capture`} loading="lazy" />
        <div className="thumb-badges">
          <span className={`badge status-${artifact.status}`}>{statusMeta[artifact.status].label}</span>
          <span className="badge type">{showVideoPill ? 'Video' : typeMeta[artifact.type]}</span>
        </div>
        <div className="thumb-time">{formatDuration(artifact.duration)}</div>
      </div>
      <div className="card-body">
        <h3 className="title">{artifact.title}</h3>
        <p className="scenario">{artifact.scenario}</p>
        <div className="meta-row">
          <span>{artifact.browser}</span>
          <span>·</span>
          <span>{formatTime(artifact.recordedAt)}</span>
          <span>·</span>
          <span>{artifact.specPath}</span>
        </div>
        <div className="tags">
          {artifact.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <span>{artifact.suite}</span>
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <a className="icon-action" href={artifact.media.src} download title="Download">
              ⬇
            </a>
            <button className="open-btn" onClick={() => onOpen(artifact.id)}>
              Open
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

function Lightbox({
  artifact,
  onClose,
  onNext,
  onPrev,
}: {
  artifact: Artifact | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!artifact) return null;

  const showVideo = artifact.hasVideo && artifact.videoSrc;

  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <div className="lightbox-card">
        <div className="lightbox-media">
          {showVideo ? (
            <video
              key={artifact.id}
              src={artifact.videoSrc}
              poster={artifact.media.src}
              controls
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img src={artifact.media.src} alt={`${artifact.title} capture`} />
          )}
        </div>
        <div className="lightbox-body">
          <div className="lightbox-header">
            <div>
              <div className="pill" style={{ gap: 6 }}>
                <span className={`badge status-${artifact.status}`}>{statusMeta[artifact.status].label}</span>
                <span className="badge type">{showVideo ? 'Video' : typeMeta[artifact.type]}</span>
                <span className="kbd">esc</span>
              </div>
              <h3 className="title" style={{ marginTop: 10, marginBottom: 6 }}>
                {artifact.title}
              </h3>
              <p className="scenario" style={{ margin: 0 }}>
                {artifact.summary}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="close-btn" onClick={onPrev}>
                ←
              </button>
              <button className="close-btn" onClick={onNext}>
                →
              </button>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>
          <div className="meta-grid">
            <div className="meta-box">
              <div className="meta-label">Spec</div>
              <div className="meta-value">{artifact.specPath}</div>
            </div>
            <div className="meta-box">
              <div className="meta-label">Browser</div>
              <div className="meta-value">{artifact.browser}</div>
            </div>
            <div className="meta-box">
              <div className="meta-label">Recorded</div>
              <div className="meta-value">{formatTime(artifact.recordedAt)}</div>
            </div>
            <div className="meta-box">
              <div className="meta-label">Duration</div>
              <div className="meta-value">{formatDuration(artifact.duration)}</div>
            </div>
          </div>
          <div className="tags">
            {artifact.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className="scenario" style={{ lineHeight: 1.6 }}>
            {artifact.scenario}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [statusFilter, setStatusFilter] = useState<ArtifactStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<Set<ArtifactType>>(new Set(['screenshot', 'video']));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showRunHint, setShowRunHint] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  const filtered = useMemo(() => {
    return allArtifacts.filter((item) => {
      const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;
      const matchesType =
        (typeFilter.has('screenshot') && item.media.kind === 'screenshot') ||
        (typeFilter.has('video') && item.hasVideo);
      return matchesStatus && matchesType;
    });
  }, [statusFilter, typeFilter]);

  const totals = useMemo(() => {
    const total = allArtifacts.length;
    return {
      total,
      failed: allArtifacts.filter((a) => a.status === 'failed').length,
      passed: allArtifacts.filter((a) => a.status === 'passed').length,
      flaky: allArtifacts.filter((a) => a.status === 'flaky').length,
    };
  }, []);

  const activeIndex = filtered.findIndex((a) => a.id === activeId);
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  const goNext = useCallback(() => {
    if (!filtered.length) return;
    const next = filtered[(activeIndex + 1 + filtered.length) % filtered.length];
    setActiveId(next.id);
  }, [activeIndex, filtered]);

  const goPrev = useCallback(() => {
    if (!filtered.length) return;
    const prev = filtered[(activeIndex - 1 + filtered.length) % filtered.length];
    setActiveId(prev.id);
  }, [activeIndex, filtered]);

  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setActiveId(null);
      }
      if (evt.key === 'ArrowRight') {
        goNext();
      }
      if (evt.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const toggleType = (type: ArtifactType) => {
    setTypeFilter((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      if (next.size === 0) {
        next.add(type);
      }
      return next;
    });
  };

  const filteredLabel =
    filtered.length === allArtifacts.length
      ? `${filtered.length} artifacts`
      : `${filtered.length} / ${allArtifacts.length} artifacts`;

  const handleRunTests = () => {
    setShowRunHint(true);
    setTimeout(() => setShowRunHint(false), 4500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="shell">
      <div className="topbar">
        <div>
          <h1 className="hero-title">Playwright Evidence Deck</h1>
          <p className="subline">Student ID: IT23152700 · Student Name: Wijesinghe S K</p>
        </div>
        <div className="actions">
          <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="ghost-btn" onClick={() => window.location.reload()}>
            Refresh page
          </button>
          <button className="primary-btn" onClick={handleRunTests}>
            Run tests & recapture
          </button>
        </div>
      </div>
      {showRunHint && (
        <div className="pill" style={{ marginBottom: 10 }}>
          Run in terminal: <code>npm run capture:media</code> (from /test), then refresh this page.
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{totals.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Failed</div>
          <div className="stat-value" style={{ color: 'var(--fail)' }}>
            {totals.failed}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Passed</div>
          <div className="stat-value" style={{ color: 'var(--pass)' }}>
            {totals.passed}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Flaky</div>
          <div className="stat-value" style={{ color: 'var(--flaky)' }}>
            {totals.flaky}
          </div>
        </div>
      </div>

      <div className="tab-row">
        <div className="tab-group">
          {(['all', 'failed', 'passed', 'flaky'] as const).map((status) => (
            <button
              key={status}
              className="tab"
              data-active={statusFilter === status}
              onClick={() => setStatusFilter(status as ArtifactStatus | 'all')}
            >
              {status === 'all' ? 'All' : statusMeta[status as ArtifactStatus].label}
            </button>
          ))}
        </div>
        <div className="tab-group">
          {(['all', 'screenshot', 'video'] as const).map((type) => (
            <button
              key={type}
              className="tab"
              data-active={type === 'all' ? typeFilter.size === 2 : typeFilter.has(type as ArtifactType)}
              onClick={() =>
                type === 'all'
                  ? setTypeFilter(new Set(['screenshot', 'video']))
                  : toggleType(type as ArtifactType)
              }
            >
              {type === 'all' ? 'All types' : typeMeta[type as ArtifactType]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p className="scenario" style={{ margin: 0 }}>
          {filteredLabel}
        </p>
        <div className="tags" />
      </div>

      <div className="gallery-grid">
        {filtered.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} onOpen={setActiveId} />
        ))}
      </div>

      {!filtered.length && (
        <div className="stat-card" style={{ marginTop: 16 }}>
          No artifacts match the current filters. Try clearing the search or toggling status/type.
        </div>
      )}

      <Lightbox artifact={active} onClose={() => setActiveId(null)} onNext={goNext} onPrev={goPrev} />
    </div>
  );
}
