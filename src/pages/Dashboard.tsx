import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { COURSES } from '../data/courses';
import { PROJECTS } from '../data/projects';
import { useStore } from '../store';
import type { ProjectTask } from '../types';

const initials = (n: string) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export default function Dashboard() {
  const { state, logout, bumpProgress, submitTask, sendQa, toast } = useStore();
  const navigate = useNavigate();
  const [openTask, setOpenTask] = useState<ProjectTask | null>(null);
  const [certFor, setCertFor] = useState<string | null>(null);
  const [taskText, setTaskText] = useState('');
  const [taskFile, setTaskFile] = useState('');
  const [qaText, setQaText] = useState('');

  useEffect(() => {
    if (!state.user) navigate('/login', { replace: true });
  }, [state.user, navigate]);

  const qaRef = useRef<HTMLDivElement>(null);
  const qaCount = state.qa.length;
  useEffect(() => {
    const el = qaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [qaCount]);

  if (!state.user) return null;

  const closeTask = () => {
    setOpenTask(null);
    setTaskText('');
    setTaskFile('');
  };

  const project = PROJECTS.find((p) => state.allocated.includes(p.id));
  const enrolledCourses = state.enrolled.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);
  const completed = enrolledCourses.filter((c) => (state.progress[c!.id] ?? 0) >= 100);
  const pending = project ? project.tasks.filter((t) => !state.tasks[t.id]).length : 0;
  const projProgress = project ? (state.projProgress[project.id] ?? 0) : 0;

  const taskTag = (t: ProjectTask) => {
    const rec = state.tasks[t.id];
    if (!rec) return <span className="tag tag--warn">Pending</span>;
    if (rec.status === 'approved') return <span className="tag tag--ok">Reviewed · {rec.marks}</span>;
    return <span className="tag">Submitted</span>;
  };

  const doSubmitTask = (e: FormEvent) => {
    e.preventDefault();
    if (!openTask) return;
    submitTask(openTask.id, taskText + (taskFile ? ` [file: ${taskFile}]` : ''));
    closeTask();
    toast('Work submitted — your mentor reviews it and feedback appears on this task.');
  };

  const doSendQa = (e: FormEvent) => {
    e.preventDefault();
    const q = qaText.trim();
    if (!q) return;
    sendQa(q);
    setQaText('');
    toast('Sent — your mentor replies here and in Friday’s session.');
  };

  const certCourse = certFor ? COURSES.find((c) => c.id === certFor) : null;
  const certId = certFor ? 'TTP-2026-' + (1000 + (certFor.length * 137) % 9000) : '';

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head sec__head--row">
          <div>
            <h1 className="sec-title">Hello, {state.user.name.split(' ')[0]}</h1>
            <p className="meta">Your participant dashboard — courses, project and mentor in one place.</p>
          </div>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => {
              logout();
              toast('Logged out.');
              navigate('/');
            }}
          >
            Log out
          </button>
        </div>

        <div className="grid grid--4" style={{ marginBottom: 40 }}>
          <div className="stat">
            <div className="n">{enrolledCourses.length}</div>
            <div className="l">Enrolled courses</div>
          </div>
          <div className="stat">
            <div className="n">{completed.length}</div>
            <div className="l">Courses completed</div>
          </div>
          <div className="stat">
            <div className="n">{project ? 1 : 0}</div>
            <div className="l">Active project</div>
          </div>
          <div className="stat">
            <div className="n">{pending}</div>
            <div className="l">Tasks pending</div>
          </div>
        </div>

        <h2 className="sec-title" style={{ fontSize: '1.3rem', marginBottom: 16 }}>
          Continue learning
        </h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid--3" style={{ marginBottom: 44 }}>
            {enrolledCourses.map((c) => {
              const p = state.progress[c!.id] ?? 0;
              return (
                <div className="panel panel--flex" key={c!.id}>
                  <span className="course-card__code">{c!.code}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem', letterSpacing: '-0.01em' }}>
                    {c!.title}
                  </h3>
                  <div className="meter">
                    <i style={{ width: `${p}%` }} />
                  </div>
                  <p className="meta mono">{p}% complete</p>
                  {p >= 100 ? (
                    <button className="btn btn--ghost btn--sm" onClick={() => setCertFor(c!.id)}>
                      View certificate
                    </button>
                  ) : (
                    <button
                      className="btn btn--sm"
                      onClick={() => {
                        const next = bumpProgress(c!.id);
                        toast(next >= 100 ? 'Course complete! Certificate unlocked.' : 'Lesson complete — progress updated.');
                      }}
                    >
                      Continue — next lesson
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="note note--plain" style={{ marginBottom: 44 }}>
            No courses yet. <Link to="/courses">Explore Courses</Link> to begin — your project allocation follows course
            completion.
          </div>
        )}

        <h2 className="sec-title" style={{ fontSize: '1.3rem', marginBottom: 16 }}>
          My Project
        </h2>
        {project ? (
          <div className="split">
            <div className="panel panel--flex">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
                    {project.name}
                  </h3>
                  <p className="dataline">{project.industry} · Mentor: {project.mentor}</p>
                </div>
                <span className="tag">Your Role: {project.role}</span>
              </div>
              <div>
                <p className="meta mono" style={{ marginBottom: 6 }}>
                  Project progress: {projProgress}%
                </p>
                <div className="meter">
                  <i style={{ width: `${projProgress}%` }} />
                </div>
              </div>
              <p className="meta">
                <b>Current problem:</b> {project.currentProblem}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {project.tasks.map((t) => (
                  <div className="task-row" key={t.id}>
                    <div>
                      <div className="t">{t.title}</div>
                      <div className="d">
                        Deadline: {t.due} · {t.points} pts
                      </div>
                    </div>
                    <div className="task-row__side">
                      {taskTag(t)}
                      <button className="btn btn--ghost btn--sm" onClick={() => setOpenTask(t)}>
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel panel--flex">
              <span className="panel-label">Your mentor</span>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="avatar">{initials(project.mentor)}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{project.mentor}</h3>
                  <p className="meta">Startup &amp; Business Mentor</p>
                </div>
              </div>
              <div className="task-row">
                <div>
                  <div className="t">Guidance session</div>
                  <div className="d">Friday — 5:00 PM · Google Meet</div>
                </div>
                <button
                  className="btn btn--sm"
                  onClick={() => toast('Preview build — the production button opens the mentor’s Google Meet room.')}
                >
                  Join Session
                </button>
              </div>
              <span className="panel-label">Q&amp;A with your mentor</span>
              <div className="qa" ref={qaRef}>
                {state.qa.length > 0 ? (
                  state.qa.map((m, i) => (
                    <div className={`msg ${m.from === 'me' ? 'msg--me' : 'msg--them'}`} key={i}>
                      <span className="who">{m.from === 'me' ? 'You' : project.mentor}</span>
                      {m.text}
                    </div>
                  ))
                ) : (
                  <p className="meta">Ask your first question — mentors reply inside the course thread.</p>
                )}
              </div>
              <form onSubmit={doSendQa} style={{ display: 'flex', gap: 8 }}>
                <input
                  className="search-input"
                  style={{ maxWidth: 'none', flex: 1 }}
                  placeholder="Ask your mentor…"
                  value={qaText}
                  onChange={(e) => setQaText(e.target.value)}
                  required
                />
                <button className="btn btn--sm" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="note note--plain">
            No project allocated yet. Complete a course, then TTP assigns you to a suitable startup project —
            allocation is always TTP's decision. <Link to="/projects">See the live projects</Link>.
          </div>
        )}
      </div>

      {openTask &&
        (() => {
          const rec = state.tasks[openTask.id];
          return (
            <Modal onClose={closeTask}>
              <h3>{openTask.title}</h3>
              <p className="meta mono" style={{ marginBottom: 6 }}>
                Milestone: {openTask.milestone} · Deadline: {openTask.due} · {openTask.points} pts
              </p>
              <p style={{ fontSize: '0.95rem', margin: '10px 0 16px' }}>{openTask.brief}</p>
              {rec?.status === 'approved' ? (
                <>
                  <div className="note" style={{ marginBottom: 14 }}>
                    <b>Mentor feedback ({rec.marks}):</b> {rec.feedback}
                  </div>
                  <p className="meta">
                    <b>Your submission:</b> {rec.submission}
                  </p>
                </>
              ) : rec?.status === 'submitted' ? (
                <>
                  <div className="note note--plain" style={{ marginBottom: 14 }}>
                    Submitted — waiting for mentor review. Feedback appears on this task.
                  </div>
                  <p className="meta">
                    <b>Your submission:</b> {rec.submission}
                  </p>
                </>
              ) : (
                <form className="form-stack" onSubmit={doSubmitTask}>
                  <label className="field">
                    Your work (text)
                    <textarea
                      rows={4}
                      required
                      placeholder="Paste your findings or a summary…"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    Attachment name (optional)
                    <input
                      placeholder="e.g. competitor-comparison.xlsx"
                      value={taskFile}
                      onChange={(e) => setTaskFile(e.target.value)}
                    />
                  </label>
                  <button className="btn btn--block" type="submit">
                    Submit Work
                  </button>
                </form>
              )}
            </Modal>
          );
        })()}

      {certCourse && (
        <Modal onClose={() => setCertFor(null)}>
          <h3>Certificate</h3>
          <div className="cert">
            <div className="wm">PREVIEW</div>
            <span className="brand__mark" style={{ margin: '0 auto 12px' }}>
              TTP
            </span>
            <span className="cert__label">Certificate of Completion</span>
            <p className="meta" style={{ marginTop: 8 }}>
              This certifies that
            </p>
            <p className="cn">{state.user.name}</p>
            <p style={{ fontSize: '0.92rem' }}>
              has successfully completed <b>{certCourse.title}</b>
            </p>
            <p className="meta mono" style={{ marginTop: 8 }}>
              Completion date: 12 August 2026 · Certificate ID: {certId}
            </p>
            <div className="sig">
              <span>Authorised signature</span>
              <span>TTP · Bhopal, MP</span>
            </div>
          </div>
          <p className="meta" style={{ marginTop: 14 }}>
            Production certificates are issued automatically by Tutor LMS Pro with all six required fields and verify
            by ID.
          </p>
        </Modal>
      )}
    </section>
  );
}
