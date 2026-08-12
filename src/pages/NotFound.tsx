import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap" style={{ padding: '90px 24px', display: 'flex', justifyContent: 'center' }}>
        <article className="dossier" data-tab="Case file · 404" style={{ maxWidth: 460, marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <h1 className="sec-title" style={{ fontSize: '1.6rem' }}>
              Page not found
            </h1>
            <span className="stamp">Not on record</span>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)' }}>
            That link doesn't match any file in the TTP catalogue. It may have moved, or the address was mistyped.
          </p>
          <div>
            <Link className="btn" to="/">
              Go to Home
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
