import { Link } from 'react-router-dom';
import type { Project } from '../types';

export default function ProjectDossier({ project }: { project: Project }) {
  const open = project.status === 'open';
  return (
    <article className="dossier dossier--hover" data-tab={`Case file · ${project.industry}`} style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <h3>{project.name}</h3>
        <span className={`stamp${open ? ' stamp--ok' : ''}`}>{open ? 'Open for allocation' : 'Allocating soon'}</span>
      </div>
      <dl className="fieldlist">
        <dt>Problem</dt>
        <dd>{project.problem}</dd>
        <dt>Objective</dt>
        <dd>{project.objective}</dd>
        <dt>Duration</dt>
        <dd>
          {project.duration} · Mentor: {project.mentor}
        </dd>
        <dt>Skills</dt>
        <dd>{project.skills.join(' · ')}</dd>
      </dl>
      <div>
        <Link className="btn btn--sm" to={`/project/${project.id}`}>
          View Project
        </Link>
      </div>
    </article>
  );
}
