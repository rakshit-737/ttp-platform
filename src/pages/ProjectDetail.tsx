import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ALLOCATION_PASSWORD, PROJECTS } from '../data/projects';
import { useStore } from '../store';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);
  const { state, allocate, toast } = useStore();
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  if (!project) return <NotFound />;

  const allocated = state.allocated.includes(project.id);
  const open = project.status === 'open';

  const tryAllocate = () => {
    if (pw.trim().toLowerCase() === ALLOCATION_PASSWORD) {
      allocate(project.id);
      toast('Allocated — the project now appears as My Project.');
      navigate('/dashboard');
    } else {
      toast('Wrong password. Allocation links and passwords come from TTP.');
    }
  };

  return (
    <section className="sec">
      <div className="wrap">
        <div className="split">
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', margin: '0 0 10px' }}>
              {project.name}
            </h1>
            <p className="dataline" style={{ marginBottom: 20 }}>
              Live startup project · {project.industry} · {project.duration}
            </p>
            <dl className="fieldlist" style={{ maxWidth: 640 }}>
              <dt>Industry</dt>
              <dd>{project.industry}</dd>
              <dt>Problem</dt>
              <dd>{project.problem}</dd>
              <dt>Objective</dt>
              <dd>{project.objective}</dd>
              <dt>Skills</dt>
              <dd>{project.skills.join(' · ')}</dd>
              <dt>Duration</dt>
              <dd>{project.duration}</dd>
              <dt>Mentor</dt>
              <dd>{project.mentor}</dd>
            </dl>

            {open ? (
              <>
                <h2 className="sec-title" style={{ fontSize: '1.35rem', margin: '38px 0 16px' }}>
                  Milestones &amp; tasks
                </h2>
                {project.tasks.map((t) => (
                  <div className="topic" key={t.id}>
                    <div className="topic__head">
                      <span>{t.milestone}</span>
                      <span className="meta mono">Deadline: {t.due}</span>
                    </div>
                    <ul>
                      <li>
                        <span className="k k--assignment">task</span>
                        {t.brief} <span className="meta mono">· {t.points} pts</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <div className="note note--plain" style={{ marginTop: 34 }}>
                Milestones and tasks are revealed to allocated participants when this project opens.
              </div>
            )}
          </div>

          <aside className="sticky">
            <div className="panel panel--flex" style={{ borderWidth: '1.5px', borderColor: 'var(--ink)' }}>
              <span className={`stamp${open ? ' stamp--ok' : ''}`}>{open ? 'Open for allocation' : 'Allocating soon'}</span>
              <p className="meta">
                Projects are free. Access is by TTP allocation after you complete the relevant course — never by
                purchase or self-enrolment.
              </p>
              {allocated ? (
                <Link className="btn btn--block" to="/dashboard">
                  Open in My Project
                </Link>
              ) : open ? (
                <>
                  <label className="field">
                    Allocation password
                    <input
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="Shared by TTP with your link"
                      autoComplete="off"
                    />
                  </label>
                  <button className="btn btn--block" onClick={tryAllocate}>
                    Enrol with allocation password
                  </button>
                  <p className="meta">
                    Preview build: the password is <b className="mono">ttp-abc</b>. In production, TTP shares the
                    password-protected link only with chosen participants (or enrols them directly with Tutor LMS Pro).
                  </p>
                </>
              ) : (
                <button className="btn btn--block" disabled>
                  Allocation not yet open
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
