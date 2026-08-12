import ProjectDossier from '../components/ProjectDossier';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <h1 className="sec-title">Work on real startup problems.</h1>
          <p className="lede">
            TTP's biggest difference from a normal course platform: after learning, you are assigned to a real startup
            project, work on real business problems in a team, and receive mentor feedback on real work.
          </p>
        </div>
        <div className="note note--plain" style={{ marginBottom: 8 }}>
          <b>How allocation works:</b> complete your course → TTP assigns you to a suitable project → you join its team
          (e.g., ABC EdTech — Marketing) → you complete tasks with deadlines → you submit work and receive feedback.
        </div>
        <div className="grid grid--2" style={{ alignItems: 'start' }}>
          {PROJECTS.map((p) => (
            <ProjectDossier key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
