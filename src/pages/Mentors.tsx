import { MENTORS } from '../data/mentors';

const initials = (n: string) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export default function Mentors() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <h1 className="sec-title">Learn under experienced mentors.</h1>
          <p className="lede">
            Every TTP participant has an assigned mentor who reviews assignments, gives feedback on project work, and
            conducts guidance sessions.
          </p>
        </div>
        <div className="grid grid--2">
          {MENTORS.map((m) => (
            <div className="panel panel--flex" key={m.name}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="avatar">{initials(m.name)}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', letterSpacing: '-0.01em' }}>
                    {m.name}
                  </h2>
                  <p className="meta">{m.title}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)' }}>{m.bio}</p>
              <p className="meta mono" style={{ fontSize: '0.78rem' }}>
                {m.focus} · Q&amp;A in every course · Weekly Google Meet
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
