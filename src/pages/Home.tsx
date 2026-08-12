import { Link } from 'react-router-dom';
import { TTPHero } from '@/components/ui/prisma-hero';
import CourseCard from '../components/CourseCard';
import ProjectDossier from '../components/ProjectDossier';
import { COURSES } from '../data/courses';
import { PROJECTS } from '../data/projects';

const PILLARS = [
  { t: 'Courses', d: 'Learn important business and startup skills through structured courses.' },
  { t: 'Real Projects', d: 'Apply your learning by working on real startup projects.' },
  { t: 'Real Problems', d: 'Understand the challenges startups are facing today.' },
  { t: 'Mentorship', d: 'Receive guidance and feedback from experienced mentors.' },
];

const JOURNEY = ['Learn', 'Apply', 'Work on Real Projects', 'Get Guidance', 'Gain Experience'];

export default function Home() {
  return (
    <>
      <TTPHero />

      <section className="sec">
        <div className="wrap">
          <div className="grid grid--4">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.t}>
                <h2>{p.t}</h2>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--wash">
        <div className="wrap">
          <div className="sec__head sec__head--row">
            <h2 className="sec-title">Popular Courses</h2>
            <Link className="btn btn--ghost" to="/courses">
              Browse all courses
            </Link>
          </div>
          <div className="grid grid--3">
            {COURSES.slice(0, 3).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec__head sec__head--row">
            <h2 className="sec-title">
              After the course, <span className="mark">a real startup is waiting.</span>
            </h2>
            <Link className="btn btn--ghost" to="/projects">
              All real projects
            </Link>
          </div>
          <div className="grid grid--2" style={{ alignItems: 'start' }}>
            <ProjectDossier project={PROJECTS[0]} />
            <div style={{ paddingTop: 28 }}>
              <p className="lede" style={{ marginBottom: 18 }}>
                TTP's biggest difference from a normal course platform: after learning, you are assigned to a real
                startup project, work on real business problems in a team, and receive mentor feedback on real work.
              </p>
              <ul className="checklist">
                <li>Complete your course — allocation is earned, not bought</li>
                <li>TTP assigns you to a suitable project and role</li>
                <li>Tasks come with deadlines; mentors grade every submission</li>
                <li>Finish all milestones and the experience is yours to claim</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="journey">
        <div className="wrap">
          <ol>
            {JOURNEY.map((t, i) => (
              <li key={t}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
